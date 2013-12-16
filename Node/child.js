/*!
 * file ./child.js
 */
 
var process = require('child_process');

var child = process.createChildProcess('sh', ['-c', 'echo hello; sleep 1; echo world;']);
child.addListener('output', function( chunk ) {
	p( chunk ); // non-understand.
});