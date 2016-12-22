njsfcgi
=======
<!--
**This is development (master) version.<br> For production version (relase) see
<https://github.com/lokolab/njsfcgi/tree/v0.0.1>**
-->
- Version: 0.0.1-dev
- Technologies:
  - JavaScript
  - Node
- Compatibility:
  - Apache HTTP Server (>=2.4)
  - mod_fcgid (>=2.3)
  - Node (>=4)
- Dependencies:
  - node-fastcgi (^1.3.2)
- Copyright / Authors:
  - Krystian Pietruszka <kpietru@lokolab.net>
- Licenses:
  - MIT <http://opensource.org/licenses/MIT>
- Download: <https://github.com/lokolab/njsfcgi/releases>
- Homepage: <http://www.lokolab.net>

Wrapper for applications in Node via "mod_fcgid".
____________________________________________________

Installing and configuring
--------------------------

First, install the "@lokolab/njsfcgi" Node module:

    npm install -g https://github.com/lokolab/njsfcgi/archive/master.tar.gz

Second, create a file named "index.mjs" inside your
website’s document root and add the following lines:

    const fcgi = require('@lokolab/njsfcgi');

    fcgi.createServer(function(request, response) {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.end('Hello');
    }).listen();

Third, create a file named "node4.fcgi" outside
your home directory and add the following lines*:

    #!/usr/local/node/4.4.3/bin/node

    const w = require('@lokolab/njsfcgi');
    w.run();

Fourth, add the following lines to your Apache configuration*:

    <IfModule fcgid_module>
        Options +ExecCgi
        AddHandler fcgid-script .mjs
        FcgidWrapper /path/to/wrapper/node4.fcgi .mjs
        <IfModule suexec_module>
            SuexecUserGroup someuser someuser
        </IfModule>
    </IfModule>

Fifth, execute commands via shell*:

    chmod 744 /path/to/wrapper/node4.fcgi
    chown someuser:someuser /path/to/wrapper/node4.fcgi

Sixth, restart the Apache HTTP Server via shell:

    service apache2 restart

Finally, in the browser, enter `http://localhost/index.mjs`

References
----------

- [FastCGI Specification][1]
- ["node-fastcgi" – Create FastCGI applications in node. Near drop-in replacement for node's http module.][2]

[1]: http://web.archive.org/web/20160306081510/http://fastcgi.com/drupal/node/6?q=node/22
[2]: http://www.npmjs.com/package/node-fastcgi

________________________________________________________
[*] Paths and username should be modified to the server.
