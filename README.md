lokolab/njsfcgi
===============
*Wrapper for applications in Node.js via "mod_fcgid"*

- Version: 0.0.1
- Technologies: JavaScript, Node.js
- Compatibility: Node.js, modules "http" and "node-fastcgi"
- Download: http://www.github.com/lokolab/njsfcgi/archive/v0.0.1.tar.gz
- License MIT

Server for applications in Node.js + Apache + mod_fcgid + mod_suexec and wrapper script.

[![NPM](https://nodei.co/npm/lokolab-njsfcgi.png?downloads=true)](https://nodei.co/npm/lokolab-njsfcgi/)

Example
-------

Application:
```javascript
jsfcgi.createServer(function(request, response) {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end('Hello World!');
}).listen();
```

FcgidWrapper*:
```javascript
#!/path/to/node/bin/node
var _jsfcgi = require('lokolab-jsfcgi');

_jsfcgi.initServer('utf8');
```

Apache*:
```apache
<IfModule fcgid_module>
    Options +ExecCgi
    AddHandler fcgid-script .njs
    FcgidWrapper /path/to/wrapper/nodejs5.fcgi .njs
    <IfModule suexec_module>
        SuexecUserGroup someuser someuser
    </IfModule>
</IfModule>
```

Execute commands via shell*:
```shell
chmod 744 /path/to/wrapper/nodejs5.fcgi

chown someuser:someuser /path/to/wrapper/nodejs5.fcgi
```

\* Paths and username should be modified to the server.
