/**
 * lokolab/jsfcgi – Server for applications in Node.js + Apache + mod_fcgid + mod_suexec and wrapper script.
 * 
 * @copyright Krystian Pietruszka <kpietru@lokolab.net>
 * @license MIT
 */

var fs = require('fs');
var fastcgi = require('node-fastcgi');

function Jsfcgi(fastcgi) {
    this.fastcgi = fastcgi;
};

Jsfcgi.prototype.callback = null;
Jsfcgi.prototype.server = null;
Jsfcgi.prototype.fastcgi = null;

Jsfcgi.prototype.createServer = function(callback) {
    this.callback = callback;
    return this.server;
};

Jsfcgi.prototype.listen = function() {
    return this.server;
};

Jsfcgi.prototype.initServer = function(encoding) {
    var self = this;
    this.server = this.fastcgi.createServer(function(request, response) {
        fs.readFile(request.cgiParams['SCRIPT_FILENAME'], encoding, function(error, data) {
            if (error) throw error;
            var jsfcgi = self;
            eval(data);
            if (!jsfcgi)                     throw 'Variable jsfcgi undefined.';
            if (typeof(jsfcgi) !== 'object') throw 'Variable jsfcgi must be an object.';
            jsfcgi.callback(request, response);
        });
    }).listen();
};

module.exports = new Jsfcgi(fastcgi);
