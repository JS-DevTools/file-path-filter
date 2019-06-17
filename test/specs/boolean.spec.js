"use strict";

const filePathFilter = require("../../lib");
const paths = require("../fixtures/paths");
const { expect } = require("chai");

describe("Booleans", () => {

  it("should filter by a single boolean", () => {
    let result = paths.filter(filePathFilter(true));
    expect(result).to.deep.equal(paths);
  });

  it("should filter by an array of booleans", () => {
    let result = paths.filter(filePathFilter([true, false, true]));
    expect(result).to.deep.equal(paths);
  });

  it("should filter by multiple boolean arguments", () => {
    let result = paths.filter(filePathFilter(true, false, true));
    expect(result).to.deep.equal(paths);
  });

  it("should filter by include and exclude booleans", () => {
    let result = paths.filter(filePathFilter({
      include: true,
      exclude: false,
    }));

    expect(result).to.deep.equal(paths);
  });

  it("should filter by only an excluded boolean", () => {
    let result = paths.filter(filePathFilter({
      exclude: false
    }));

    expect(result).to.deep.equal(paths);
  });

  it("should filter out everything if false", () => {
    let result = paths.filter(filePathFilter(false));
    expect(result).to.deep.equal([]);
  });

  it("should filter out everything if an array of false", () => {
    let result = paths.filter(filePathFilter([false]));
    expect(result).to.deep.equal([]);
  });

  it("should filter out everything if include is false", () => {
    let result = paths.filter(filePathFilter({
      include: false,
    }));

    expect(result).to.deep.equal([]);
  });

  it("should filter out everything if exclude is true", () => {
    let result = paths.filter(filePathFilter({
      exclude: true,
    }));

    expect(result).to.deep.equal([]);
  });

  it("should filter out everything if exclude is true, even if include is true", () => {
    let result = paths.filter(filePathFilter({
      include: true,
      exclude: true,
    }));

    expect(result).to.deep.equal([]);
  });

});
