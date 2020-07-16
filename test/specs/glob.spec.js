"use strict";

const filePathFilter = require("../../lib");
const paths = require("../fixtures/paths");
const { expect } = require("chai");

describe("Globs", () => {

  it("should filter by a single glob", () => {
    let result = paths.filter(filePathFilter("**/*.txt"));

    expect(result).to.deep.equal([
      "/path/to/my/website/robots.txt"
    ]);
  });

  it("should filter by an array of globs", () => {
    let result = paths.filter(filePathFilter([
      "**/*.txt",
      "**/*.png",
    ]));

    expect(result).to.deep.equal([
      "/path/to/my/website/robots.txt",
      "/path/to/my/website/img/logo.png",
      "/path/to/my/website/img/banner.png",
    ]);
  });

  it("should filter by multiple glob arguments", () => {
    let result = paths.filter(filePathFilter(
      "**/*.ico",
      "**/*.txt"
    ));

    expect(result).to.deep.equal([
      "/path/to/my/website/robots.txt",
      "/path/to/my/website/favicon.ico",
    ]);
  });

  it("should filter by include and exclude globs", () => {
    let result = paths.filter(filePathFilter({
      include: "**/*.html",
      exclude: "**/blog/*.html",
    }));

    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
    ]);
  });

  it('should filter by include and exclude globs (using "!")', () => {
    let result = paths.filter(filePathFilter(
      "**/*.html",
      "!**/blog/*.html"
    ));

    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
    ]);
  });

  it("should filter by only an excluded glob", () => {
    let result = paths.filter(filePathFilter({
      exclude: "**/*.html"
    }));

    expect(result).to.deep.equal([
      "/path/to/my/website/robots.txt",
      "/path/to/my/website/favicon.ico",
      "/path/to/my/website/img/logo.png",
      "/path/to/my/website/img/banner.png",
    ]);
  });

  it('should filter by only an excluded glob (using "!")', () => {
    let result = paths.filter(filePathFilter("!**/*.html"));

    expect(result).to.deep.equal([
      "/path/to/my/website/robots.txt",
      "/path/to/my/website/favicon.ico",
      "/path/to/my/website/img/logo.png",
      "/path/to/my/website/img/banner.png",
    ]);
  });

  it('should filter by include and exclude globs, also using "!"', () => {
    let result = paths.filter(filePathFilter({
      include: [
        "**/*.html",         // include all HTML files
      ],
      exclude: [
        "**/blog/**",        // exclude the blog directory
        "!**/*t.*",          // exclude files whose names don't end in "t"
      ]
    }));

    expect(result).to.deep.equal([
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
    ]);
  });

  it("should filter by a glob with braces", () => {
    let result = paths.filter(filePathFilter("**/*.{txt,ico}"));

    expect(result).to.deep.equal([
      "/path/to/my/website/robots.txt",
      "/path/to/my/website/favicon.ico",
    ]);
  });

  /* eslint-env node */
  if (process.platform === "win32") {
    it("should filter Windows file paths", () => {
      const windowsPaths = Object.freeze(paths.map((path) =>
        "C:" + path.replace(/\//g, "\\")
      ));

      let result = windowsPaths.filter(filePathFilter(
        "**/*.html",
        "!**/blog/*.html"
      ));

      expect(result).to.deep.equal([
        "C:\\path\\to\\my\\website\\index.html",
        "C:\\path\\to\\my\\website\\about.html",
        "C:\\path\\to\\my\\website\\contact.html",
      ]);
    });
  }

});
