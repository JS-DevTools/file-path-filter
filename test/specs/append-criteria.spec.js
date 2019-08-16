"use strict";

const filePathFilter = require("../../lib");
const paths = require("../fixtures/paths");
const { expect } = require("chai");

describe("Appending criteria to an existing filter function", () => {

  it("should append inclusion criteria to an empty filter function", () => {
    // Start with empty filter criteria
    let filter = filePathFilter([]);

    // Which will include every path
    let result = paths.filter(filter);
    expect(result).to.deep.equal(paths);

    // Now append an include criteria
    filter = filePathFilter("**/*.html", filter);

    // Which will now match only the HTML files
    result = paths.filter(filter);
    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
      "/path/to/my/website/blog/post1.html",
      "/path/to/my/website/blog/post2.html",
      "/path/to/my/website/blog/post3.html",
    ]);
  });

  it("should append exclusion criteria to an empty filter function", () => {
    // Start with empty filter criteria
    let filter = filePathFilter([]);

    // Which will include every path
    let result = paths.filter(filter);
    expect(result).to.deep.equal(paths);

    // Now append an exclusion criteria
    filter = filePathFilter("!**/*.html", filter);

    // Which will now match everything except HTML files
    result = paths.filter(filter);
    expect(result).to.deep.equal([
      "/path/to/my/website/robots.txt",
      "/path/to/my/website/favicon.ico",
      "/path/to/my/website/img/logo.png",
      "/path/to/my/website/img/banner.png",
    ]);
  });

  it("should append inclusion and exclusion criteria to an empty filter function", () => {
    // Start with empty filter criteria
    let filter = filePathFilter([]);

    // Which will include every path
    let result = paths.filter(filter);
    expect(result).to.deep.equal(paths);

    // Now append an include criteria
    filter = filePathFilter("**/*.html", filter);

    // Which will now match only the HTML files
    result = paths.filter(filter);
    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
      "/path/to/my/website/blog/post1.html",
      "/path/to/my/website/blog/post2.html",
      "/path/to/my/website/blog/post3.html",
    ]);

    // Now append an exclusion criteria
    filter = filePathFilter("!**/blog/**/*", filter);

    // Which will now match only some of the HTML files
    result = paths.filter(filter);
    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
    ]);
  });

  it("should append inclusion criteria to existing inclusion criteria", () => {
    // Start with a filter that includes all HTML files
    let filter = filePathFilter("**/*.html");
    let result = paths.filter(filter);
    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
      "/path/to/my/website/blog/post1.html",
      "/path/to/my/website/blog/post2.html",
      "/path/to/my/website/blog/post3.html",
    ]);

    // Now append a filter that includes PNG images
    filter = filePathFilter("**/*.png", filter);
    result = paths.filter(filter);
    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
      "/path/to/my/website/img/logo.png",
      "/path/to/my/website/img/banner.png",
      "/path/to/my/website/blog/post1.html",
      "/path/to/my/website/blog/post2.html",
      "/path/to/my/website/blog/post3.html",
    ]);
  });

  it("should append exclusion criteria to existing inclusion criteria", () => {
    // Start with a filter that includes all HTML files
    let filter = filePathFilter("**/*.html");
    let result = paths.filter(filter);
    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
      "/path/to/my/website/blog/post1.html",
      "/path/to/my/website/blog/post2.html",
      "/path/to/my/website/blog/post3.html",
    ]);

    // Now append a filter that excludes some HTML files
    filter = filePathFilter("!**/blog/*.html", filter);
    result = paths.filter(filter);
    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
    ]);
  });

  it("should append inclusion criteria to existing exclusion criteria", () => {
    // Start with a filter that excludes images and text files
    let filter = filePathFilter("!**/*.{ico,png,txt}");
    let result = paths.filter(filter);
    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
      "/path/to/my/website/blog/post1.html",
      "/path/to/my/website/blog/post2.html",
      "/path/to/my/website/blog/post3.html",
    ]);

    // Now append a filter that includes blog posts
    filter = filePathFilter("**/blog/**/*", filter);
    result = paths.filter(filter);
    expect(result).to.deep.equal([
      "/path/to/my/website/blog/post1.html",
      "/path/to/my/website/blog/post2.html",
      "/path/to/my/website/blog/post3.html",
    ]);
  });

  it("should append exclusion criteria to existing exclusion criteria", () => {
    // Start with a filter that excludes images and text files
    let filter = filePathFilter("!**/*.{ico,png,txt}");
    let result = paths.filter(filter);
    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
      "/path/to/my/website/blog/post1.html",
      "/path/to/my/website/blog/post2.html",
      "/path/to/my/website/blog/post3.html",
    ]);

    // Now append a filter that excludes blog posts
    filter = filePathFilter("!**/blog/**/*", filter);
    result = paths.filter(filter);
    expect(result).to.deep.equal([
      "/path/to/my/website/index.html",
      "/path/to/my/website/about.html",
      "/path/to/my/website/contact.html",
    ]);
  });

});
