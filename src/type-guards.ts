// tslint:disable: no-any no-unsafe-any
import { FilterCriterion } from "./types";

/**
 * Determines whether the given value is a `FilterCriterion`.
 */
export function isFilterCriterion(value: any): value is FilterCriterion {
  let type = typeof value;
  return type === "string" ||
    type === "boolean" ||
    type === "function" ||
    value instanceof RegExp;
}
