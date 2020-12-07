const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-index-js": hot(preferDefault(require("F:\\JAMstack Serverless and Headless CMS\\JAMstack-TodoApp\\packages\\www\\src\\pages\\index.js")))
}

