const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.get('/values', function(req, res){
    var rr="<html>";
    rr = rr+"<body>";
    rr = rr+"<form method='post' action='addition'>";
    rr = rr+"first number"+"<input type='text' name='a' value=''><br>";
    rr = rr+"second number"+"<input type='text' name='b' value=''><br>";
    rr = rr+"<input type='submit' name='t1' value='submit'>";
    rr = rr+"</form>";
    rr = rr+"</body>";
    rr = rr+"</html>";
    res.send(rr);
});

app.post('/addition', urlencodedParser,
    function(req, res){
        var a = req.body.a;
        var b = req.body.b;
        a = parseInt(a);
        b = parseInt(b);
        var c = a+b;
        res.send("The answer is "+c);
    }).listen(9000);
console.log("Server started at 9000");

