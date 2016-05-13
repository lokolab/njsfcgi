njsfcgi
=======
<!--
**This is development (master) version.<br> For production version (relase) see
<https://github.com/lokolab/njsfcgi/tree/v0.0.1>**
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
  - MIT <http://opensource.org/licenses/MIT>
- Download: <https://github.com/lokolab/njsfcgi/releases>
- Homepage: <http://www.lokolab.net>

Wrapper for applications in Node.js via "mod_fcgid".
____________________________________________________

Installing and configuring
--------------------------

First, install the "lokolab-njsfcgi" Node.js module:

    npm install -g https://github.com/lokolab/njsfcgi/archive/master.tar.gz

Second, create a file named "app.njs" inside your
website’s document root and add the following lines:

    var http = require('lokolab-njsfcgi');
    var http = njsfcgi;

    function requestHandler(request, response) {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.end('Hello World!');
    }
    var server = http.createServer(requestHandler);
    server.listen();

Third, create a file named "node4.fcgi" outside
your home directory and add the following lines*:

    #!/usr/local/node/4.4.3/bin/node

    var w = require('lokolab-njsfcgi');
    w.run();

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

Sixth, restart the Apache HTTP Server via shell:

    service apache2 restart

Finally, in the browser, enter `http://localhost/app.njs`

References
----------

- [FastCGI Specification][1]
- ["node-fastcgi" – Create FastCGI applications in node. Near drop-in replacement for node's http module.][2]

[1]: http://web.archive.org/web/20160306081510/http://fastcgi.com/drupal/node/6?q=node/22
[2]: http://www.npmjs.com/package/node-fastcgi

________________________________________________________
[*] Paths and username should be modified to the server.
