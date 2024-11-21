var mysql = require('mysql');
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: ""
});

con.connect(function(err) {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected!");
    
    // Creating the database
    con.query("CREATE DATABASE wtA1", function(err, result) {
        if (err) {
            console.error("Error creating database:", err);
            return;
        }
        console.log("Database Created");
    });
});
