"use strict";

const filePathFilter = require("../../lib");
const { expect } = require("chai");

describe("filePathFilter() API", () => {

  it("should throw an error if called with no arguments", () => {
    function noArgs () {
      filePathFilter();
    }

    expect(noArgs).to.throw("Invalid filter criteria: undefined");
  });

  it("should throw an error if called with an invalid argument", () => {
    function noArgs () {
      filePathFilter(42);
    }

    expect(noArgs).to.throw("Invalid filter criteria: 42");
  });

  it("should throw an error if called with valid and invalid arguments", () => {
    function noArgs () {
      filePathFilter("**/*.html", true, 12345, /\.html$/);
    }

    expect(noArgs).to.throw("Invalid filter criteria: 12345");
  });

});
