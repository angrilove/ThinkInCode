/*!
 * file ./router.js
 */

// route function
function route( handle, pathname , request, response ) {
	console.log('About to route a rquest for ' + pathname);
	if ( typeof handle[pathname] === 'function' ) { // running your function
		handle[pathname]( request, response );
	} else {
		console.log('No request handler found for ' + pathname);
		response.writeHead(400, {"Content-Type": "text/html"});
		response.write('404 Not found');
		response.end();
	}
}

// export your module
exports.route = route;