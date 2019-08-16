import { filePathFilter } from "./file-path-filter";

export { AnyFilter, FilterCriteria, FilterCriterion, FilterFunction, Filters } from "./types";
export { filePathFilter };

// Export `filePathFilter` as a named export and the default export
// tslint:disable: no-default-export
export default filePathFilter;

// CommonJS default export hack
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);  // tslint:disable-line: no-unsafe-any
}
