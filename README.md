njsfcgi
=======
<!--
**This is development (master) version.<br> For production version (relase) see
<https://github.com/lokolab/njsfcgi/tree/v1.0.0>**
-->
- Version: 0.0.1-dev
- Technologies:
  - JavaScript
  - Node.js
- Compatibility:
  - Apache HTTP Server (>= 2.4)
  - mod_fcgid (>= 2.3)
  - Node.js (>= 4)
- Dependencies:
  - node-fastcgi (>= 1, < 2)
- Copyright / Authors:
  - Krystian Pietruszka <kpietru@lokolab.net>
- Licenses:
  - MIT
- Download: <https://github.com/lokolab/rbfcgi/releases>
- Homepage: <http://www.lokolab.net>

Wrapper for applications in Node.js via "mod_fcgid".
____________________________________________________

Configuration and installation
------------------------------

First, install the "njsfcgi" Node.js module:

    npm install -g https://github.com/lokolab/njsfcgi/archive/v0.0.1.tar.gz

Second, create a file named "index.njs" inside your
website’s document root and add the following lines:

    var http = njsfcgi;
    http.createServer(function(request, response) {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.end('Hello World!');
    }).listen();

Third, create a file named "node4.fcgi" outside
your home directory and add the following lines*:

    #!/usr/local/node/4.4.3/bin/node
    var n = require('njsfcgi');
    n.run();

Fourth, add the following lines to your Apache configuration*:

    <IfModule fcgid_module>
        Options +ExecCgi
        AddHandler fcgid-script .njs
        FcgidWrapper /path/to/wrapper/node4.fcgi .njs
        <IfModule suexec_module>
            SuexecUserGroup someuser someuser
        </IfModule>
    </IfModule>

Fifth, execute commands via shell*:

    chmod 744 /path/to/wrapper/node4.fcgi
    chown someuser:someuser /path/to/wrapper/node4.fcgi

Finally, restart the Apache HTTP Server.

See
---
- [FastCGI Specification][1]
- ["node-fastcgi" – Create FastCGI applications in node. Near drop-in replacement for node's http module.][2]

[1]: http://web.archive.org/web/20160306081510/http://fastcgi.com/drupal/node/6?q=node/22
[2]: http://www.npmjs.com/package/node-fastcgi

________________________________________________________
[*] Paths and username should be modified to the server.
