"use strict";

const { createFilter } = require("../../lib");
const paths = require("../fixtures/paths");
const { expect } = require("chai");

describe("createFilter()", () => {

  it("should filter custom file objects by a single glob pattern", () => {
    let files = paths.map((path) => ({ path }));

    function getPath (file) {
      return file.path;
    }

    let filter = createFilter({ getPath }, "**/*.html");
    let result = files.filter(filter);

    expect(result).to.deep.equal([
      { path: "/path/to/my/website/index.html" },
      { path: "/path/to/my/website/about.html" },
      { path: "/path/to/my/website/contact.html" },
      { path: "/path/to/my/website/blog/post1.html" },
      { path: "/path/to/my/website/blog/post2.html" },
      { path: "/path/to/my/website/blog/post3.html" },
    ]);
  });

  it("should filter custom file objects by multiple globs", () => {
    let files = paths.map((path) => ({ deep: { path }}));
    let filter = createFilter({ getPath },
      "**/*.txt",
      "**/*.png",
    );
    let result = files.filter(filter);

    function getPath (file) {
      return file.deep.path;
    }

    expect(result).to.deep.equal([
      { deep: { path: "/path/to/my/website/robots.txt" }},
      { deep: { path: "/path/to/my/website/img/logo.png" }},
      { deep: { path: "/path/to/my/website/img/banner.png" }},
    ]);
  });

  it("should filter custom file objects with separate include/exclude criteria", () => {
    let files = paths.map((path) => ({ path }));

    function getPath (file) {
      return file.path;
    }

    let filter = createFilter({ getPath },
      {
        include: [
          /\.html$/,
          "**/*.{png,ico}",
        ],
        exclude: [
          "**/blog/*",
          (file) => file.path.endsWith("banner.png"),
        ]
      }
    );

    let result = files.filter(filter);

    expect(result).to.deep.equal([
      { path: "/path/to/my/website/index.html" },
      { path: "/path/to/my/website/about.html" },
      { path: "/path/to/my/website/contact.html" },
      { path: "/path/to/my/website/favicon.ico" },
      { path: "/path/to/my/website/img/logo.png" },
    ]);
  });

  it("should filter pass all arguments to the getPath() function", () => {
    let files = paths.map((path) => ({ path }));
    let random = Math.random();
    let now = new Date();

    function getPath (num, date, file) {
      expect(num).to.equal(random);
      expect(date.toISOString()).to.equal(now.toISOString());
      return file.path;
    }

    let filter = createFilter({ getPath }, "**/*.html", "!**/blog/**");
    let result = files.filter((file) => filter(random, now, file));

    expect(result).to.deep.equal([
      { path: "/path/to/my/website/index.html" },
      { path: "/path/to/my/website/about.html" },
      { path: "/path/to/my/website/contact.html" },
    ]);
  });

  it("should filter pass all arguments to criteria functions", () => {
    let files = paths.map((path) => ({ path }));
    let random = Math.random();
    let now = new Date();

    function getPath (file) {
      return file.path;
    }

    let filter = createFilter({ getPath },
      {
        include (num, date, file) {
          expect(num).to.equal(random);
          expect(date.toISOString()).to.equal(now.toISOString());
          return file.path.endsWith(".html");
        },
        exclude (num, date, file) {
          expect(num).to.equal(random);
          expect(date.toISOString()).to.equal(now.toISOString());
          return file.path.endsWith("about.html");
        }
      }
    );

    let result = files.filter((file) => filter(random, now, file));

    expect(result).to.deep.equal([
      { path: "/path/to/my/website/index.html" },
      { path: "/path/to/my/website/contact.html" },
      { path: "/path/to/my/website/blog/post1.html" },
      { path: "/path/to/my/website/blog/post2.html" },
      { path: "/path/to/my/website/blog/post3.html" },
    ]);
  });

});
