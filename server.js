const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = 3010;

const mime = {
  html: 'text/html; charset=utf-8',
  css: 'text/css; charset=utf-8',
  js: 'application/javascript; charset=utf-8',
  json: 'application/json; charset=utf-8',
  webp: 'image/webp',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  svg: 'image/svg+xml',
  ico: 'image/x-icon',
  txt: 'text/plain; charset=utf-8',
  xml: 'application/xml; charset=utf-8'
};

function resolvePath(urlPath) {
  let reqPath = (urlPath || '/').split('?')[0];

  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  if (reqPath.endsWith('/')) {
    reqPath += 'index.html';
  }

  let filePath = path.join(root, reqPath);

  // Support folder routes like /services/pravilo
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    filePath += '.html';
  }

  return filePath;
}

const server = http.createServer((req, res) => {
  const filePath = resolvePath(req.url);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404');
    return;
  }

  const ext = path.extname(filePath).slice(1).toLowerCase();
  res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
  const stream = fs.createReadStream(filePath);
  stream.on('error', () => {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    }
    res.end('500');
  });
  stream.pipe(res);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
