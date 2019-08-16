// tslint:disable-next-line: no-require-imports
import GlobToRegExp = require("glob-to-regexp");
import { isFilterCriterion } from "./type-guards";
import { AnyFilter, Filter, FilterCriterion, FilterFunction, Filters } from "./types";

const isWindows = process.platform === "win32";

/**
 * Normalizes the user-provided filter criteria. The normalized form is a `Filters` object
 * whose `include` and `exclude` properties are both `FilterFunction` arrays.
 */
export function normalize(criteria: AnyFilter): Filters<FilterFunction[]> {
  let filters: Filters<FilterFunction[]> = {
    include: [],
    exclude: [],
  };

  // Convert each criterion to a FilterFunction
  let tuples = normalizeCriteria(criteria);

  // Populate the `include` and `exclude` arrays
  for (let [filter, filterFunction] of tuples) {
    filters[filter].push(filterFunction);
  }

  return filters;
}

/**
 * Creates a `FilterFunction` for each given criterion.
 */
function normalizeCriteria(criteria: AnyFilter, filter?: Filter): Array<[Filter, FilterFunction]> {
  let tuples = [];

  if (Array.isArray(criteria)) {
    for (let criterion of criteria) {
      tuples.push(normalizeCriterion(criterion, filter));
    }
  }
  else if (isFilterCriterion(criteria)) {
    tuples.push(normalizeCriterion(criteria, filter));
  }
  else if (criteria && typeof criteria === "object" && !filter) {
    if (criteria.include !== undefined) {
      tuples.push(...normalizeCriteria(criteria.include, "include"));
    }
    if (criteria.exclude !== undefined) {
      tuples.push(...normalizeCriteria(criteria.exclude, "exclude"));
    }
  }
  else {
    throw new Error(`Invalid filter criteria: ${criteria}`);
  }

  return tuples;
}

/**
 * Creates a `FilterFunction` for each given criterion.
 *
 * @param criteria - One or more filter critiera
 * @param filter - The type of filter. Defaults to `include`, except for glob patterns that start with "!"
 */
function normalizeCriterion(criterion: FilterCriterion, filter?: Filter): [Filter, FilterFunction] {
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
    filterFunction = createGlobFilter(pattern, invert);
  }
  else if (criterion instanceof RegExp) {
    let pattern = criterion;
    filterFunction = function regExpFilter(filePath: string) {
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
function createGlobFilter(pattern: RegExp, invert: boolean): FilterFunction {
  return function globFilter(filePath: string) {
    if (isWindows) {
      // Glob patterns only use forward slashes, even on Windows
      filePath = filePath.replace(/\\/g, "/");
    }

    let match = pattern.test(filePath);
    return invert ? !match : match;
  };
}
