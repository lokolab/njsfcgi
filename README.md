lokolab/jsfcgi
==============

[ Node.js ] [ License MIT ]

Server for applications in Node.js + Apache + mod_fcgid + mod_suexec and wrapper script.

Compatibile with modules "http" and "node-fastcgi".

[![NPM](https://nodei.co/npm/lokolab-jsfcgi.png?downloads=true)](https://nodei.co/npm/lokolab-jsfcgi/)

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
<IfModule mod_fcgid.c>
    Options +ExecCgi
    AddHandler fcgid-script .js
    # Idea, wrapper path per user: /home/.fcgi/someuser/node/node5.fcgi
    FcgidWrapper /path/to/wrapper/node5.fcgi .js
    <IfModule mod_suexec.c>
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
