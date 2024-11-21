var http = require('http');
var url = require('url');
const {getsum, getDiff} = require('./fun')


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var q = url.parse(req.url, true).query;
    var a = parseInt(q.a);
    var b = parseInt(q.b);
    var sum = getsum(a, b); var diff = getDiff(a, b);
    res.write('<h1> Sum is ' + sum + '</h1> <br>' + '<h1> Difference is ' + diff + '</h1>');
    res.end();
} ).listen(3000);
