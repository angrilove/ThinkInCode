/*!
 * file ./tcp.js
 * TCP server
 */

var tcp = require('tcp');
tcp.createServer(function( socket ) {
	socket.addListener('connect', function() {
		socket.send('Hi, how are you?\n');
	});
	socket.addlistener('receive', function( data ) {
		socket.send( data );
	});
}).listen( 1521 );