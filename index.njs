/**
 * njsfcgi
 * Wrapper for applications in Node.js via "mod_fcgid".
 * 
 * @see README.md
 * 
 * @copyright Krystian Pietruszka <kpietru@lokolab.net>
 * @license MIT
 */

var fs = require('fs');
var fastcgi = require('node-fastcgi');

function Njsfcgi(fastcgi) {
    this.fastcgi = fastcgi;
};

Njsfcgi.prototype.callback = null;
Njsfcgi.prototype.server = null;
Njsfcgi.prototype.fastcgi = null;

Njsfcgi.prototype.createServer = function(callback) {
    this.callback = callback;
    return this.server;
};

Njsfcgi.prototype.listen = function() {
    return this.server;
};

Njsfcgi.prototype.initServer = function(encoding) {
    var self = this;
    this.server = this.fastcgi.createServer(function(request, response) {
        fs.readFile(request.cgiParams['SCRIPT_FILENAME'], encoding, function(error, data) {
            if (error) throw error;
            var njsfcgi = self;
            if (data.match(/^#!.+/))          var data = "//" + data;
            eval(data);
            if (!njsfcgi)                     throw 'Variable njsfcgi undefined.';
            if (typeof(njsfcgi) !== 'object') throw 'Variable njsfcgi must be an object.';
            njsfcgi.callback(request, response);
        });
    }).listen();
};

module.exports = new Njsfcgi(fastcgi);
