const UrlPrettifier = require('next-url-prettifier').default;
 
const routes = [
  {
    page: 'index',
    prettyUrl: '/home'
  },
]
 
const urlPrettifier = new UrlPrettifier(routes);
exports.default = routes;
exports.Router = urlPrettifier;