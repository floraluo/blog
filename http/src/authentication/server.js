let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');

let server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
    let filepath = path.join(path.resolve(), pathname);
    fs.stat(filepath, (err, stats) => {
      if (err) {
        res.writeHead(404);
        res.end('404 Not Found.')
      } else {
        if (!req.headers.authorization) {
          res.writeHead(401, {'WWW-Authenticate':'Basic realm="input user id and password"'});
          res.end();
        } else {
          let base64 = req.headers.authorization.split(' ')[1];
          let userPswd = Buffer.from(base64, 'base64').toString('ascii').split(':');
          let user = userPswd[0], pswd = userPswd[1];
          console.log(user, pswd);
          if (user === 'admin' && pswd === '123') {
            res.writeHead(200);
            fs.createReadStream(filepath).pipe(res);
          } else {
            res.writeHead(401);
            res.end('error user id or password!');
          }
        }
      }
    })
}).listen(9020, () => {
  console.log('9020端口开始监听');
})