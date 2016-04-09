lokolab/njsfcgi
===============
*Wrapper for applications in Node.js via "mod_fcgid"*

- Version: 0.0.1
- Technologies: JavaScript, Node.js
- Compatibility: Apache HTTP Server (2.4), "mod_fcgid (2.3)", Node.js (4, 5), modules "http" and "node-fastcgi (0.1.10)"
- Download: http://www.github.com/lokolab/njsfcgi/archive/v0.0.1.tar.gz
- Copyright: Krystian Pietruszka (email kpietru@lokolab.net)
- License MIT

[![NPM](https://nodei.co/npm/lokolab-njsfcgi.png?downloads=true)](https://nodei.co/npm/lokolab-njsfcgi/)

Example
-------

Application:
```javascript
njsfcgi.createServer(function(request, response) {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end('Hello World!');
}).listen();
```

FcgidWrapper*:
```javascript
#!/usr/local/ruby/5.10.0/bin/node
var _njsfcgi = require('lokolab-njsfcgi');
_njsfcgi.initServer('utf8');
```

Apache*:
```apache
<IfModule fcgid_module>
    Options +ExecCgi
    AddHandler fcgid-script .njs
    FcgidWrapper /path/to/wrapper/node5.fcgi .njs
    <IfModule suexec_module>
        SuexecUserGroup someuser someuser
    </IfModule>
</IfModule>
```

Execute commands via shell*:
```shell
chmod 744 /path/to/wrapper/node5.fcgi

chown someuser:someuser /path/to/wrapper/node5.fcgi
```

\* Paths and username should be modified to the server.
