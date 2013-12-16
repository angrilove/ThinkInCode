/*!
 * file ./Server/jquery.ajax.post.js
 */
 
var http = require('http');
var url = require('url');

http.createServer(function(request, response) {
	var data = url.parse(request.url).querystring;
	
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write('queryString:' + data);
	response.end('utf-8');
	// logs
	console.log(request.url);
}).listen( 80 );

console.log('The service of jquery.ajax.post.js start...');