# Change Log
All notable changes will be documented in this file.
`file-path-filter` adheres to [Semantic Versioning](http://semver.org/).


## [v2.0.0](https://github.com/JS-DevTools/file-path-filter/tree/v2.0.0) (2019-08-16)

- You can now append additional inclusion/exclusion criteria to an existing filter function. Just pass the new criteria and the existing filter function to `filePathFilter()`.

**Example:**

```javascript
const filePathFilter = require("file-path-filter");

const paths = [
  "/my/website/favicon.ico",
  "/my/website/index.html",
  "/my/website/styles.css",
  "/my/website/blog/post.html",
  "/my/website/blog/styles.css",
];

// Create a filter that includes all HTML files
let filter = filePathFilter("**/*.html");
paths.filter(filter);

// [
//   "/my/website/index.html",
//   "/my/website/blog/post.html",
// ]


// Now exclude the blog directory
filter = filePathFilter("!**/blog/**", filter);
paths.filter(filter);

// [
//   "/my/website/index.html",
// ]


// Now include all CSS files
filter = filePathFilter("**/*.css", filter);
console.log(paths.filter(filter));

// Nnotice that it doesn't include the blog's CSS file,
// since the blog directory was excluded above
// [
//   "/my/website/index.html",
//   "/my/website/styles.css",
// ]
```

[Full Changelog](https://github.com/JS-DevTools/file-path-filter/compare/v1.0.3...v2.0.0)