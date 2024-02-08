import http from 'http';

const server = http.createServer((req, res) => {
  const { method, url } = req;

  res.setHeader('Content-Type', 'application/json');
  console.log(method, url);
  res.end(JSON.stringify({ message: 'Hello World' }));

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
