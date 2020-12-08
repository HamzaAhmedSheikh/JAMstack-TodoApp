const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("F:\\JAMstack Serverless and Headless CMS\\JAMstack-TodoApp\\packages\\www\\.cache\\dev-404-page.js"))),
  "component---src-pages-app-js": hot(preferDefault(require("F:\\JAMstack Serverless and Headless CMS\\JAMstack-TodoApp\\packages\\www\\src\\pages\\app.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("F:\\JAMstack Serverless and Headless CMS\\JAMstack-TodoApp\\packages\\www\\src\\pages\\index.js")))
}

