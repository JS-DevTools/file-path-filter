import { normalize } from "./normalize";
import { AnyFilter, FilterCriterion, FilterFunction, Filters, Options } from "./types";
import { PathFilter, _filters } from "./util";

/**
 * Creates a `FilterFunction` that matches file paths based on the specified criteria.
 *
 * @param criteria - One or more glob patterns, regular expressions, or filter functions
 * @returns A `FilterFunction` that matches file paths based on the specified criteria
 */
export function createFilter(options: Options, criteria: AnyFilter): FilterFunction;

/**
 * Creates a `FilterFunction` that matches file paths based on the specified criteria.
 *
 * @param criteria - One or more glob patterns, regular expressions, or filter functions
 * @returns A `FilterFunction` that matches file paths based on the specified criteria
 */
export function createFilter(options: Options, ...criteria: FilterCriterion[]): FilterFunction;

/**
 * Creates a `FilterFunction` that matches file paths based on the specified criteria.
 *
 * @param filters - An object with `include` and `exclude` filter criteria
 * @returns A `FilterFunction` that matches file paths based on the specified criteria
 */
export function createFilter(options: Options, filters: Filters): FilterFunction;

export function createFilter(options: Options, ...args: unknown[]): FilterFunction {
  let criteria = args.length <= 1 ? args[0] as AnyFilter : args as FilterCriterion[];
  let filters = normalize(criteria, options);

  (pathFilter as PathFilter)[_filters] = filters;
  return pathFilter;

  function pathFilter(...args: unknown[]): boolean {
    // Does the file path match any of the exclude filters?
    let exclude = filters.exclude.some((filter) => filter(...args));
    if (exclude) {
      return false;
    }

    if (filters.include.length === 0) {
      // Include everything that's not excluded
      return true;
    }

    // Does the file path match any of the include filters?
    let include = filters.include.some((filter) => filter(...args));
    return include;
  }
}
