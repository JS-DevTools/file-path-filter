"use strict";

const filePathFilter = require("../../lib");
const paths = require("../fixtures/paths");
const { expect } = require("chai");

describe("Filter Functions", () => {

  it("should filter by a single filter function", () => {
    let result = paths.filter(filePathFilter(
      (path) => path.endsWith(".txt")
    ));

    expect(result).to.deep.equal([
      "/path/to/my/website/robots.txt"
    ]);
  });

  it("should filter by an array of filter functions", () => {
    let result = paths.filter(filePathFilter([
      (path) => path.endsWith(".txt"),
      (path) => path.endsWith(".png"),
    ]));

    expect(result).to.deep.equal([
      "/path/to/my/website/robots.txt",
      "/path/to/my/website/img/logo.png",
      "/path/to/my/website/img/banner.png",
    ]);
  });

  it("should filter by multiple filter function arguments", () => {
    let result = paths.filter(filePathFilter(
      (path) => path.endsWith(".ico"),
      (path) => path.endsWith(".txt")
    ));

    expect(result).to.deep.equal([
      "/path/to/my/website/robots.txt",
      "/path/to/my/website/favicon.ico",
    ]);
  });

  it("should filter by include and exclude filter functions", () => {
    let result = paths.filter(filePathFilter({
      include: (path) => path.endsWith(".html"),
      exclude: (path) => path.includes("/blog/") && path.endsWith(".html"),
    }));

    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
    ]);
  });

  it('should filter by an include filter function and an exclude glob (using "!")', () => {
    let result = paths.filter(filePathFilter(
      (path) => path.endsWith(".html"),
      "!**/blog/*.html"
    ));

    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
    ]);
  });

  it("should filter by only an excluded filter function", () => {
    let result = paths.filter(filePathFilter({
      exclude: (path) => path.endsWith(".html")
    }));

    expect(result).to.deep.equal([
      "/path/to/my/website/robots.txt",
      "/path/to/my/website/favicon.ico",
      "/path/to/my/website/img/logo.png",
      "/path/to/my/website/img/banner.png",
    ]);
  });

  it("should filter by include and exclude filter functions", () => {
    let result = paths.filter(filePathFilter({
      include: [
        (path) => path.endsWith(".html"),           // include all HTML files
      ],
      exclude: [
        (path) => path.includes("/blog/"),          // exclude the blog directory
        (path) => !path.includes("t."),             // exclude files whose names don't end in "t"
      ]
    }));

    expect(result).to.deep.equal([
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
    ]);
  });

});
