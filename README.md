lokolab/njsfcgi
===============

- Version:
      0.0.1
- Technologies:
      JavaScript, Node.js
- Compatibility:
      Apache HTTP Server (>= 2.4), "mod_fcgid (>= 2.3)", Node.js (>= 4), modules "http" and "node-fastcgi"
- Download:
      http://www.github.com/lokolab/njsfcgi/archive/v0.0.1.tar.gz
- Copyright:
      Krystian Pietruszka <kpietru@lokolab.net>
- License MIT

Wrapper for applications in Node.js via "mod_fcgid".

Configuration and installation
------------------------------

Example application:

    #!/usr/bin/node
    njsfcgi.createServer(function(request, response) {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.end('Hello World!');
    }).listen();

FcgidWrapper*:

    #!/usr/local/node/5.10.0/bin/node
    var _njsfcgi = require('lokolab-njsfcgi');
    _njsfcgi.initServer('utf8');

Apache*:

    <IfModule fcgid_module>
        Options +ExecCgi
        AddHandler fcgid-script .njs
        FcgidWrapper /path/to/wrapper/node5.fcgi .njs
        <IfModule suexec_module>
            SuexecUserGroup someuser someuser
        </IfModule>
    </IfModule>

Execute commands via shell*:

    chmod 744 /path/to/wrapper/node5.fcgi
    chown someuser:someuser /path/to/wrapper/node5.fcgi

[*] Paths and username should be modified to the server.
