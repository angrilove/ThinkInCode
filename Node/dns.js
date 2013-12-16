/*!
 * file ./dns.js
 * DNS
 */

var dns = require('dns');
dns.resolve4('nodejs.org').addCallback(function( r ) {
	p( r );
});