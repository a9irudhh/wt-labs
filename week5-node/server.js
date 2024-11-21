var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<body bgcolor='yellow'>");
    res.write('<h1>Hello World</h1>');
    res.write('</body>');
    res.end('Hello World\n');
    console.log('Request received');
    }).listen(3000);

console.log('Server running at http://localhost:3000/');