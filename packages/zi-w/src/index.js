const path = require('path');
module.exports = function (context, options) {
  return {
    name: 'docusaurus-plugin',
    getPathsToWatch() {
      const contentPath = path.resolve(context.siteDir, options.path);
      return [`${contentPath}/**/*.{ts,tsx}`];
    },
  };
};
