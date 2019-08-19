"use strict";

const commonJSExport = require("../../");
const { default: defaultExport, filePathFilter: namedExport, createFilter } = require("../../");
const { expect } = require("chai");

describe("file-path-filter package exports", () => {

  it("should export the filePathFilter() function as the default CommonJS export", () => {
    expect(commonJSExport).to.be.a("function");
    expect(commonJSExport.name).to.equal("filePathFilter");
  });

  it("should export the filePathFilter() function as the default ESM export", () => {
    expect(defaultExport).to.be.a("function");
    expect(defaultExport).to.equal(commonJSExport);
  });

  it("should export the filePathFilter() function as a named export", () => {
    expect(namedExport).to.be.a("function");
    expect(namedExport).to.equal(commonJSExport);
  });

  it("should export the createFilter() function as a named export", () => {
    expect(createFilter).to.be.a("function");
    expect(createFilter.name).to.equal("createFilter");
  });

  it("should not export anything else", () => {
    expect(Object.keys(commonJSExport)).to.have.same.members([
      "default",
      "createFilter",
      "filePathFilter",
    ]);
  });

});
