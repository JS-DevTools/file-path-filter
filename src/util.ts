import { FilterCriterion, FilterFunction, Filters } from "./types";

/**
 * Symbol used to store the underlying filters of a `pathFilter()` function.
 */
export const _filters = Symbol("_filters");

/**
 * A `pathFilter()` function that was created by `filePathFilter()`.
 */
export interface PathFilter extends FilterFunction {
  [_filters]: Filters<FilterFunction[]>;
}

/**
 * Determines whether the given value is a `FilterCriterion`.
 */
export function isFilterCriterion(value: unknown): value is FilterCriterion {
  let type = typeof value;
  return type === "string" ||
    type === "boolean" ||
    type === "function" ||
    value instanceof RegExp;
}

/**
 * Determines whether the given value is one of our internal `pathFilter()` functions.
 */
export function isPathFilter(value: unknown): value is PathFilter {
  let fn = value as PathFilter;
  return fn &&
    typeof fn === "function" &&
    typeof fn[_filters] === "object";
}
