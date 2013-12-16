/*!
 * file ./server.js
 */
 
// required builtin module named 'http'
var http = require("http");
var url = require("url");

/**
 * Guide for startServer.
 * @param ${object} 
 */
function startServer( route, handle ) {
	// function used request
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log('Request for ' + pathname + ' received.');
		
		route( handle, pathname, request, response );
	}
	
	http.createServer( onRequest ).listen( 80 );

	// write log
	console.log('Server is running...');
}

// export your module, exports.$(you want to export module name)
exports.startServer = startServer;