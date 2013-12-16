/*!
 * file ./watch.js
 * Watch File
 */

var process = require('child_process');
process.watchFile(__filename, function() {
	puts('You changed me!');
	process.exit();
});