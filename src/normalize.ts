import * as GlobToRegExp from "glob-to-regexp";
import * as path from "path";
import { AnyFilter, Filter, FilterCriterion, FilterFunction, Filters, Options } from "./types";
import { _filters, isFilterCriterion, isPathFilter } from "./util";

/**
 * Normalizes the user-provided filter criteria. The normalized form is a `Filters` object
 * whose `include` and `exclude` properties are both `FilterFunction` arrays.
 */
export function normalize(criteria: AnyFilter, opts: Options): Filters<FilterFunction[]> {
  let filters: Filters<FilterFunction[]> = {
    include: [],
    exclude: [],
  };

  let options = normalizeOptions(opts);

  // Convert each criterion to a FilterFunction
  let tuples = normalizeCriteria(criteria, options);

  // Populate the `include` and `exclude` arrays
  for (let [filter, filterFunction] of tuples) {
    filters[filter].push(filterFunction);
  }

  return filters;
}

type NormalizedOptions = Required<Options>;

/**
 * Fills-in defaults for any options that weren't specified by the caller.
 */
function normalizeOptions(options: Options): NormalizedOptions {
  return {
    getPath: options.getPath || String,
    sep: options.sep || path.sep,
  };
}

/**
 * Creates a `FilterFunction` for each given criterion.
 */
function normalizeCriteria(
criteria: AnyFilter, options: NormalizedOptions, filter?: Filter): Array<[Filter, FilterFunction]> {
  let tuples: Array<[Filter, FilterFunction]> = [];

  if (Array.isArray(criteria)) {
    for (let criterion of criteria) {
      tuples.push(...normalizeCriteria(criterion, options, filter));
    }
  }
  else if (isPathFilter(criteria)) {
    for (let filterFunction of criteria[_filters].include) {
      tuples.push(["include", filterFunction]);
    }
    for (let filterFunction of criteria[_filters].exclude) {
      tuples.push(["exclude", filterFunction]);
    }
  }
  else if (isFilterCriterion(criteria)) {
    tuples.push(normalizeCriterion(criteria, options, filter));
  }
  else if (criteria && typeof criteria === "object" && !filter) {
    if (criteria.include !== undefined) {
      tuples.push(...normalizeCriteria(criteria.include, options, "include"));
    }
    if (criteria.exclude !== undefined) {
      tuples.push(...normalizeCriteria(criteria.exclude, options, "exclude"));
    }
  }
  else {
    throw new Error(`Invalid filter criteria: ${criteria}`);
  }

  return tuples;
}

/**
 * Creates a `FilterFunction` for the given criterion.
 *
 * @param criteria - One or more filter critiera
 * @param options - Options for how the `FilterFunction` should behave
 * @param filter - The type of filter. Defaults to `include`, except for glob patterns that start with "!"
 */
function normalizeCriterion(
criterion: FilterCriterion, options: NormalizedOptions, filter?: Filter): [Filter, FilterFunction] {
  const globOptions = { extended: true, globstar: true };
  let type = typeof criterion;
  let filterFunction: FilterFunction;

  if (type === "function") {
    filterFunction = criterion as FilterFunction;
  }
  else if (type === "boolean") {
    let bool = criterion as boolean;
    filterFunction = function booleanFilter() {
      return bool;
    };
  }
  else if (type === "string") {
    let glob = criterion as string;
    let invert = false;

    if (glob.startsWith("!")) {
      glob = glob.substr(1);
      invert = Boolean(filter);
      filter = filter || "exclude";
    }

    let pattern = GlobToRegExp(glob, globOptions);
    filterFunction = createGlobFilter(pattern, options, invert);
  }
  else if (criterion instanceof RegExp) {
    let pattern = criterion;
    let { getPath } = options;

    filterFunction = function regExpFilter(...args: unknown[]) {
      let filePath = getPath(...args);
      return pattern.test(filePath);
    };
  }
  else {
    throw new Error(`Invalid filter criteria: ${criterion}`);
  }

  return [filter || "include", filterFunction];
}

/**
 * Creates a `FilterFunction` for filtering based on glob patterns
 */
function createGlobFilter(pattern: RegExp, options: NormalizedOptions, invert: boolean): FilterFunction {
  let { getPath, sep } = options;

  return function globFilter(...args: unknown[]) {
    let filePath = getPath(...args);

    if (sep !== "/") {
      // Glob patterns always expect forward slashes, even on Windows
      filePath = filePath.replace(new RegExp("\\" + sep, "g"), "/");
    }

    let match = pattern.test(filePath);
    return invert ? !match : match;
  };
}
