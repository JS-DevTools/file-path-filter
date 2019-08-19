/**
 * A function that filters files.
 */
export type FilterFunction = (...args: unknown[]) => unknown;

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
export type AnyFilter = FilterCriteria | Partial<Filters>;

/**
 * Options for creating a custom file filter
 */
export interface Options {
  /**
   * A function taht returns the file path from the given arguments.
   *
   * Defaults to a function that returns the first argument as a string.
   */
  getPath?: PathGetter;

  /**
   * The path separator. This allows you to filter paths from
   * other operating systems (e.g. filtering Windows paths on a Mac).
   *
   * Defaults to the default path separtor for the host OS.
   */
  sep?: string;
}

/**
 * A function that returns the file path from the given arguments
 */
export type PathGetter = (...args: unknown[]) => string;
