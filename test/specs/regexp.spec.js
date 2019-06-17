"use strict";

const filePathFilter = require("../../lib");
const paths = require("../fixtures/paths");
const { expect } = require("chai");

describe("Regular Expressions", () => {

  it("should filter by a single regular expression", () => {
    let result = paths.filter(filePathFilter(/\.txt$/));

    expect(result).to.deep.equal([
      "/path/to/my/website/robots.txt"
    ]);
  });

  it("should filter by an array of regular expressions", () => {
    let result = paths.filter(filePathFilter([
      /\.txt$/,
      /\.png$/,
    ]));

    expect(result).to.deep.equal([
      "/path/to/my/website/robots.txt",
      "/path/to/my/website/img/logo.png",
      "/path/to/my/website/img/banner.png",
    ]);
  });

  it("should filter by multiple regular expression arguments", () => {
    let result = paths.filter(filePathFilter(
      /\.ico$/,
      /\.txt$/
    ));

    expect(result).to.deep.equal([
      "/path/to/my/website/robots.txt",
      "/path/to/my/website/favicon.ico",
    ]);
  });

  it("should filter by include and exclude regular expressions", () => {
    let result = paths.filter(filePathFilter({
      include: /\.html$/,
      exclude: /\/blog\/.*\.html$/,
    }));

    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
    ]);
  });

  it('should filter by an include regular expression and an exclude glob (using "!")', () => {
    let result = paths.filter(filePathFilter(
      /\.html$/,
      "!**/blog/*.html"
    ));

    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
    ]);
  });

  it("should filter by only an excluded regular expression", () => {
    let result = paths.filter(filePathFilter({
      exclude: /\.html$/
    }));

    expect(result).to.deep.equal([
      "/path/to/my/website/robots.txt",
      "/path/to/my/website/favicon.ico",
      "/path/to/my/website/img/logo.png",
      "/path/to/my/website/img/banner.png",
    ]);
  });

  it("should filter by include and exclude regular expressions", () => {
    let result = paths.filter(filePathFilter({
      include: [
        /\.html$/,           // include all HTML files
      ],
      exclude: [
        /\/blog\//,          // exclude the blog directory
        /.*[^t]\..*/,        // exclude files whose names don't end in "t"
      ]
    }));

    expect(result).to.deep.equal([
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
    ]);
  });

});
