/*!
 * file ./net.js
 */
 
var net = require('net');

net.createServer(function( socket ) {
	socket.write('hello world\n');
	socket.end();
}).listen( 0x27c3 );