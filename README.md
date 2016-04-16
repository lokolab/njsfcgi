njsfcgi
=======

- Version:
      0.0.1
- Technologies:
      JavaScript, Node.js
- Compatibility:
      Apache HTTP Server (>= 2.4), "mod_fcgid (>= 2.3)", Node.js (>= 4)
- Download:
      https://github.com/lokolab/njsfcgi/archive/v0.0.1.tar.gz
- Copyright:
      Krystian Pietruszka <kpietru@lokolab.net>
- License MIT

Wrapper for applications in Node.js via "mod_fcgid".

Configuration and installation
------------------------------

First, install the "njsfcgi" Node.js module:

    npm install -g https://github.com/lokolab/njsfcgi/archive/v0.0.1.tar.gz

Second, create a file named "index.njs" inside your
website’s document root and add the following lines:

    #!/usr/bin/node
    njsfcgi.createServer(function(request, response) {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.end('Hello World!');
    }).listen();

Third, create a file named "node4.fcgi" outside
your home directory and add the following lines*:

    #!/usr/local/node/4.4.3/bin/node
    var njsf = require('njsfcgi');
    njsf.run();

Fourth, add the following lines to your Apache configuration*:

    <IfModule fcgid_module>
        Options +ExecCgi
        AddHandler fcgid-script .njs
        FcgidWrapper /path/to/wrapper/node4.fcgi .njs
        <IfModule suexec_module>
            SuexecUserGroup someuser someuser
        </IfModule>
    </IfModule>

Finally, execute commands via shell*:

    chmod 744 /path/to/wrapper/node4.fcgi
    chown someuser:someuser /path/to/wrapper/node4.fcgi

[*] Paths and username should be modified to the server.
