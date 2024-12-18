var mysql = require('mysql');
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Anirudh@2024"
});

con.connect(function(err) {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected!");
    
    //Drop existing database
    con.query("DROP DATABASE wtA1", function(err, result) {
        if (err) {
            console.error("Error dropping database:", err);
            return;
        }
        console.log("Database Dropped");
    });
    
    // Creating the database
    con.query("CREATE DATABASE wtA1", function(err, result) {
        if (err) {
            console.error("Error creating database:", err);
            return;
        }
        console.log("Database Created");
    });

    // Creating the table for Students (rollnum, percentage, name)
    con.query("CREATE TABLE wtA1.Students (rollnum INT PRIMARY KEY, percentage FLOAT, name VARCHAR(255))", function(err, result) {
        if (err) {
            console.error("Error creating table:", err);
            return;
        }
        console.log("Table Created");
    });

    // Inserting some sample data into the table
    con.query("INSERT INTO wtA1.Students (rollnum, percentage, name) VALUES (1, 100, 'Anirudh')", function(err, result) {
        if (err) {
            console.error("Error inserting data:", err);
            return;
        }
        console.log("Data Inserted");
    });

    // get input from the user and insert into the table
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const urlencodedParser = bodyParser.urlencoded({ extended: true });

    app.get('/values', function(req, res){
        var rr="<html>";
        rr = rr+"<body>";
        rr = rr+"<form method='post' action='addition'>";
        rr = rr+"rollnum"+"<input type='text' name='rollnum' value=''><br>";
        rr = rr+"percentage"+"<input type='text' name='percentage' value=''><br>";
        rr = rr+"name"+"<input type='text' name='name' value=''><br>";
        rr = rr+"<input type='submit' name='t1' value='submit'>";
        rr = rr+"</form>";
        rr = rr+"</body>";
        rr = rr+"</html>";
        res.send(rr);
    });

    app.post('/addition', urlencodedParser,
        function(req, res){
            var rollnum = req.body.rollnum;
            var percentage = req.body.percentage;
            var name = req.body.name;
            rollnum = parseInt(rollnum);
            percentage = parseFloat(percentage);
            con.query("INSERT INTO wtA1.Students (rollnum, percentage, name) VALUES (?, ?, ?)", [rollnum, percentage, name], function(err, result) {
                if (err) {
                    console.error("Error inserting data:", err);
                    return;
                }
                console.log("Data Inserted" + {rollnum, percentage, name});
            });
            res.send("Data Inserted");
        }).listen(9000);
    console.log("Server started at 9000");

});

