/**
 * A function that filters files.
 */
export type FilterFunction = (filePath: string, ...args: unknown[]) => unknown;

/**
 * A single filter criterion.
 */
export type FilterCriterion = boolean | string | RegExp | FilterFunction;

/**
 * One or more filter criteria.
 */
export type FilterCriteria = FilterCriterion | FilterCriterion[];

/**
 * The possible fields of the `Filters` object.
 */
export type Filter = "include" | "exclude";

/**
 * Include and exclude filter criteria.
 */
export interface Filters<T = FilterCriteria> {
  include: T;
  exclude: T;
}

/**
 * Filter criteria, or an object containing filter criteria.
 */
export type AnyFilter = FilterCriteria | Filters;
