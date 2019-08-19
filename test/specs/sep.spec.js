"use strict";

const { createFilter } = require("../../lib");
const paths = require("../fixtures/paths");
const { expect } = require("chai");

describe("options.sep", () => {

  it("should use POSIX path separators for glob criteria, even on Windows", () => {
    let windowsPaths = paths.map((p) => "C:" + p.replace(/\//g, "\\"));
    let filter = createFilter({ sep: "\\" }, "**/blog/*.html");
    let result = windowsPaths.filter(filter);

    expect(result).to.deep.equal([
      "C:\\path\\to\\my\\website\\blog\\post1.html",
      "C:\\path\\to\\my\\website\\blog\\post2.html",
      "C:\\path\\to\\my\\website\\blog\\post3.html",
    ]);
  });

  it("should use POSIX path separators for glob criteria, even with a nonstandard path separator", () => {
    let customPaths = paths.map((p) => p.replace(/\//g, "|"));
    let filter = createFilter({ sep: "|" }, "**/{img,blog}/*.{png,html}");
    let result = customPaths.filter(filter);

    expect(result).to.deep.equal([
      "|path|to|my|website|img|logo.png",
      "|path|to|my|website|img|banner.png",
      "|path|to|my|website|blog|post1.html",
      "|path|to|my|website|blog|post2.html",
      "|path|to|my|website|blog|post3.html",
    ]);
  });

  it("should allow multi-character separators", () => {
    let customPaths = paths.map((p) => p.replace(/\//g, "-----"));
    let filter = createFilter({ sep: "-----" }, "**/website/blog/post*");
    let result = customPaths.filter(filter);

    expect(result).to.deep.equal([
      "-----path-----to-----my-----website-----blog-----post1.html",
      "-----path-----to-----my-----website-----blog-----post2.html",
      "-----path-----to-----my-----website-----blog-----post3.html",
    ]);
  });

});
