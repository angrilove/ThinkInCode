/*!
 * file ./index.js
 */

// create your server module, attribute is a filename<not include expended-name>
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

// a handle object
var handle = {}
handle['/'] = requestHandlers.startServer;
handle['/startServer'] = requestHandlers.startServer;
handle['/upload'] = requestHandlers.upload;
handle['/show'] = requestHandlers.show;

server.startServer(router.route, handle);