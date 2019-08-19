import { createFilter } from "./create-filter";
import { AnyFilter, FilterCriterion, FilterFunction, Filters } from "./types";

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
  return createFilter({}, ...args as FilterCriterion[]);
}
