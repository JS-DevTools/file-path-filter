# File Path Filter
Filters file paths using globs, regular expressions, or custom criteria

[![Cross-Platform Compatibility](https://jsdevtools.org/img/badges/os-badges.svg)](https://travis-ci.com/JS-DevTools/file-path-filter)
[![Build Status](https://api.travis-ci.com/JS-DevTools/file-path-filter.svg?branch=master)](https://travis-ci.com/JS-DevTools/file-path-filter)

[![Coverage Status](https://coveralls.io/repos/github/JS-DevTools/file-path-filter/badge.svg?branch=master)](https://coveralls.io/github/JS-DevTools/file-path-filter)
[![Dependencies](https://david-dm.org/JS-DevTools/file-path-filter.svg)](https://david-dm.org/JS-DevTools/file-path-filter)

[![npm](https://img.shields.io/npm/v/file-path-filter.svg)](https://www.npmjs.com/package/file-path-filter)
[![License](https://img.shields.io/npm/l/file-path-filter.svg)](LICENSE)



Example
--------------------------

```javascript
const filePathFilter = require("file-path-filter");

const paths = [
  "/some/path/index.html",
  "/some/path/contact.html",
  "/some/path/about.html",
  "/some/path/favicon.ico",
  "/some/path/img/logo.png",
];

// Filter using a glob pattern
paths.filter(filePathFilter("**/*.html"));

// Exclude glob patterns with "!"
paths.filter(filePathFilter("**/*.html", "!**/index.html"));

// Filter using a regular expression
paths.filter(filePathFilter(/\.(ico|png)$/));

// Filter using custom criteria
paths.filter(filePathFilter(path => path.length === 23));

// Use any combination of filters
paths.filter(filePathFilter([
  "**/*.html",
  "!**/index.html",
  /\.(ico|png)$/,
  path => path.length === 23
]));

// Explicitly specify include and exclude criteria
paths.filter(filePathFilter({
  include:  [
    "**/*.html",
    /\.(ico|png)$/,
    path => path.length === 23
  ],
  exclude: "**/index.html",
));

```



Installation
--------------------------
You can install `file-path-filter` via [npm](https://docs.npmjs.com/about-npm/).

```bash
npm install file-path-filter
```



Usage
--------------------------

### filePathFilter(criteria)

- **`criteria`** - The filter criteria. This can be any of the following:
  - A boolean. `true` will match all files. `false` will not match any files.
  - A [glob pattern](https://en.wikipedia.org/wiki/Glob_(programming)). If the pattern starts with `!`, then it will be treated as an `exclude` pattern (see below)
  - A [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
  - A [filter function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Syntax) that accepts a file path and returns `true` if the file should be matched
  - An array containing any combination of the above types
  - An object with `include` and `exclude` properties. Each of these properties can be any of the above types.  File paths will be matched if they match any of the `include` criteria and do not match any of the `exclude` criteria.

- **`return value`** - A [filter function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Syntax) that matches file paths that meet the specified criteria


### createFilter(options, criteria)

- **`options`** - An object with some or all of the following properties:
  - `map` - A function that maps filtered items to file paths
  - `sep` - A custom path separator, such as `\` or `/`

- **`criteria`** - The filter criteria. See the [`filePathFilter`](#filepathfiltercriteria) for details.

- **`return value`** - A [filter function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Syntax) that matches file paths that meet the specified criteria

The `createFilter` function is an alternative to the `filePathFilter` function that allows you to customize the behavior to suit your needs.

#### Filtering objects
The `filePathFilter` function creates a function that filters arrays of strings, but what if you need to filter an array of objects instead?  That's where the `map` option comes in handy. You can use it to map objects (or any other value) to file paths.  Here's an example:

```javascript
const { createFilter } = require("file-path-filter");
const path = require("path");

const files = [
  { dir: "/my/website", filename: "index.html" },
  { dir: "/my/website", filename: "contact.html" },
  { dir: "/my/website/blog", filename: "post-1.html" },
  { dir: "/my/website/blog", filename: "post-2.html" },
];

// A function to returns the path of each file
function map(file) {
  return path.join(file.dir, file.filename);
}

// Filter the file objects - return all HTML files except the blog posts
files.filter(createFilter({ map }, "**/*.html", "!**/blog/*.html"));
```


Contributing
--------------------------
Contributions, enhancements, and bug-fixes are welcome!  [File an issue](https://github.com/JS-DevTools/file-path-filter/issues) on GitHub and [submit a pull request](https://github.com/JS-DevTools/file-path-filter/pulls).

#### Building
To build the project locally on your computer:

1. __Clone this repo__<br>
`git clone https://github.com/JS-DevTools/file-path-filter.git`

2. __Install dependencies__<br>
`npm install`

3. __Build the code__<br>
`npm run build`

4. __Run the tests__<br>
`npm test`



License
--------------------------
File Path Filter is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.



Big Thanks To
--------------------------
Thanks to these awesome companies for their support of Open Source developers ❤

[![Travis CI](https://jsdevtools.org/img/badges/travis-ci.svg)](https://travis-ci.com)
[![SauceLabs](https://jsdevtools.org/img/badges/sauce-labs.svg)](https://saucelabs.com)
[![Coveralls](https://jsdevtools.org/img/badges/coveralls.svg)](https://coveralls.io)
