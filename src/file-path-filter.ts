import { normalize } from "./normalize";
import { _filters, AnyFilter, FilterCriterion, FilterFunction, Filters, PathFilter } from "./types";

/**
 * Creates a `FilterFunction` that matches file paths based on the specified criteria.
 *
 * @param criteria - One or more glob patterns, regular expressions, or filter functions
 * @returns A `FilterFunction` that matches file paths based on the specified criteria
 */
export function filePathFilter(criteria: AnyFilter): FilterFunction;

/**
 * Creates a `FilterFunction` that matches file paths based on the specified criteria.
 *
 * @param criteria - One or more glob patterns, regular expressions, or filter functions
 * @returns A `FilterFunction` that matches file paths based on the specified criteria
 */
export function filePathFilter(...criteria: FilterCriterion[]): FilterFunction;

/**
 * Creates a `FilterFunction` that matches file paths based on the specified criteria.
 *
 * @param filters - An object with `include` and `exclude` filter criteria
 * @returns A `FilterFunction` that matches file paths based on the specified criteria
 */
export function filePathFilter(filters: Filters): FilterFunction;

export function filePathFilter(...args: unknown[]): FilterFunction {
  let filters = args.length <= 1 ? normalize(args[0] as AnyFilter) : normalize(args as FilterCriterion[]);
  (pathFilter as PathFilter)[_filters] = filters;
  return pathFilter;

  function pathFilter(filePath: string, ...other: unknown[]): boolean {
    // Does the file path match any of the exclude filters?
    let exclude = filters.exclude.some((filter) => filter(filePath, ...other));
    if (exclude) {
      return false;
    }

    if (filters.include.length === 0) {
      // Include everything that's not excluded
      return true;
    }

    // Does the file path match any of the include filters?
    let include = filters.include.some((filter) => filter(filePath, ...other));
    return include;
  }
}
