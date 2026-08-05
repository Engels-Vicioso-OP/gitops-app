const http = require('http');

const PORT = process.env.PORT || 8080;
const APP_TITLE = process.env.APP_TITLE || 'GitOps Portal';
const APP_ENV = process.env.APP_ENV || 'local-dev';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: "Hello from Argo GitOps Pipeline for the thirdtime!",
    title: APP_TITLE,
    environment: APP_ENV,
    timestamp: new Date().toISOString()
  }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});