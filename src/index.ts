import { filePathFilter } from "./file-path-filter";

export * from "./types";
export { createFilter } from "./create-filter";
export { filePathFilter };

// Export `filePathFilter` as a named export and the default export
export default filePathFilter;

// CommonJS default export hack
/* eslint-env commonjs */
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);
}
