const routes = require('next-routes')();
routes
.add("/crowdFundings/:address", "/crowdFunding/show")
.add("/crowdFundings/:address/requests", "/crowdFunding/requests")
.add("/crowdFundings/:address/requests/new", '/crowdFunding/addRequest');

module.exports = routes;