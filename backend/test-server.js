const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ status: 'ok', message: 'Test backend is working!' }));
});

server.listen(8000, '0.0.0.0', () => {
  console.log('Test backend server running on port 8000');
});