/* 
Imagine you are developing a web application that manages a library's book inventory. You have a database with 2 table's called "books" and "authors".
The "books" table has the following columns:
    - id (int, primary key)
    - title (varchar(255))
    - author_id (int, foreign key to authors.id)
    - published_date (date)
    - quantity (int)
The "authors" table has the following columns:
    - id (int, primary key)
    - name (varchar(255))
    - bio (text)

Your task is to create a Node.js server that interacts with this database using the mysql module. The server should have the following routes:
    - Retrieve the list of all books in the database along with their authors' names.
    - Add a new book to the database. The user should be able to provide the title, author's name, published date, and quantity. Ensuring that the author's name is valid (i.e., exists in the authors table), If not then add the author to the authors table and then add the book.
    - Update the quantity of a book in the database.
    - delete a book from the database by its id.
*/

var mysql = require('mysql');
var express = require('express');
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Anirudh@2024",
    database: "Library"
});

con.connect(function(err) {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected!");
    
    //Drop existing
    con.query("DROP DATABASE Library", function(err, result) {
        if (err) {
            console.error("Error dropping database:", err);
            return;
        }
        console.log("Database Dropped");
    });

    // Creating the database
    con.query("CREATE DATABASE Library", function(err, result) {
        if (err) {
            console.error("Error creating database:", err);
            return;
        }
        console.log("Database Created");
    });

    // Creating the table for Authors (id, name, bio)
    con.query("CREATE TABLE Library.Authors (id INT PRIMARY KEY, name VARCHAR(255), bio TEXT)", function(err, result) {
        if (err) {
            console.error("Error creating table:", err);
            return;
        }
        console.log("Table Created");
    });

    // Creating the table for Books (id, title, author_id, published_date, quantity)
    con.query("CREATE TABLE Library.Books (id INT PRIMARY KEY, title VARCHAR(255), author_id INT, published_date DATE, quantity INT, FOREIGN KEY (author_id) REFERENCES Authors(id))", function(err, result) {
        if (err) {
            console.error("Error creating table:", err);
            return;
        }
        console.log("Table Created");
    });

    // use express to create the server
    // Inserting some sample data into the table
    
    con.query("INSERT INTO Library.Authors (id, name, bio) VALUES (1, 'Anirudh', 'Student')", function(err, result) {
        if (err) {
            console.error("Error inserting data:", err);
            return;
        }
        console.log("Data Inserted");
    });

    con.query("INSERT INTO Library.Books (id, title, author_id, published_date, quantity) VALUES (1, 'Book1', 1, '2021-09-01', 10)", function(err, result) {
        if (err) {
            console.error("Error inserting data:", err);
            return;
        }
        console.log("Data Inserted");
    });


    const app = express();
    const bodyParser = require('body-parser');
    const urlencodedParser = bodyParser.urlencoded({ extended: true });

    app.get('/books', function(req, res){
        con.query("SELECT Books.id, Books.title, Authors.name FROM Library.Books INNER JOIN Library.Authors ON Books.author_id = Authors.id", function(err, result) {
            if (err) {
                console.error("Error fetching data:", err);
                return;
            }
            console.log("Data Fetched");
            console.log(result);
            
            var rr="<html>";
            rr = rr+"<body>";
            rr = rr+"<table>";
            rr = rr+"<tr>";
            rr = rr+"<th>id</th>";
            rr = rr+"<th>title</th>";
            rr = rr+"<th>author_name</th>";
            rr = rr+"</tr>";
            for (var i = 0; i < result.length; i++) {
                rr = rr+"<tr>";
                rr = rr+"<td>"+result[i].id+"</td>";
                rr = rr+"<td>"+result[i].title+"</td>";
                rr = rr+"<td>"+result[i].name+"</td>";
                rr = rr+"</tr>";
            }
            rr = rr+"</table>";
            // add delete button that redirects to /deletebook
            rr = rr+"<form method='get' action='deletebook'>";
            rr = rr+"<input type='submit' name='t1' value='Delete'>";
            rr = rr+"</form>";
            rr = rr+"</body>";
            rr = rr+"</html>";
            res.send(rr);
        });
    });


    app.get('/addbook', function(req, res){
        var rr="<html>";
        rr = rr+"<body>";
        rr = rr+"<form method='post' action='addition'>";
        rr = rr+"title"+"<input type='text' name='title' value=''><br>";
        rr = rr+"author_name"+"<input type='text' name='author_name' value=''><br>";
        rr = rr+"published_date"+"<input type='text' name='published_date' value=''><br>";
        rr = rr+"quantity"+"<input type='text' name='quantity' value=''><br>";
        rr = rr+"<input type='submit' name='t1' value='submit'>";
        rr = rr+"</form>";
        rr = rr+"</body>";
        rr = rr+"</html>";
        res.send(rr);
    });


    app.post('/addition', urlencodedParser,
        function(req, res){
            var title = req.body.title;
            var author_name = req.body.author_name;
            var published_date = req.body.published_date;
            var quantity = req.body.quantity;
            con.query("SELECT id FROM Library.Authors WHERE name = ?", [author_name], function(err, result) {
                if (err) {
                    console.error("Error fetching data:", err);
                    return;
                }
                if (result.length == 0) {
                    con.query("SELECT MAX(id) as max_id FROM Library.Authors", function(err, result) {
                        if (err) {
                            console.error("Error fetching data:", err);
                            return;
                        }
                        var author_id = result[0].max_id + 1;
                        con.query("INSERT INTO Library.Authors (id, name, bio) VALUES (?, ?, 'Author')", [author_id, author_name], function(err, result) {
                            if (err) {
                                console.error("Error inserting data:", err);
                                return;
                            }
                            console.log("Data Inserted");
                        });
                    });
                } else {
                    var author_id = result[0].id;
                }
                con.query("SELECT MAX(id) as max_id FROM Library.Books", function(err, result) {
                    if (err) {
                        console.error("Error fetching data:", err);
                        return;
                    }
                    var book_id = result[0].max_id + 1;
                    con.query("INSERT INTO Library.Books (id, title, author_id, published_date, quantity) VALUES (?, ?, ?, ?, ?)", [book_id, title, author_id, published_date, quantity], function(err, result) {
                        if (err) {
                            console.error("Error inserting data:", err);
                            return;
                        }
                        console.log("Data Inserted");
                    });
                });
            });
            res.send("Data Inserted");
        });

        // Delete a book from the database by its id
        app.get('/deletebook', function(req, res){
            var rr="<html>";
            rr = rr+"<body>";
            rr = rr+"<form method='post' action='delete'>";
            rr = rr+"id"+"<input type='text' name='id' value=''><br>";
            rr = rr+"<input type='submit' name='t1' value='submit'>";
            rr = rr+"</form>";
            rr = rr+"</body>";
            rr = rr+"</html>";
            res.send(rr);
        });

        app.post('/delete', urlencodedParser,
            function(req, res){
                var id = req.body.id;
                con.query("DELETE FROM Library.Books WHERE id = ?", [id], function(err, result) {
                    if (err) {
                        console.error("Error deleting data:", err);
                        return;
                    }

                    if (result.affectedRows == 0) {
                        console.log("No data found to delete");
                        res.send("No data found to delete");
                    } else {
                        console.log("Data Deleted");
                        res.send("Data Deleted");
                    }                    
                });
            });
    app.listen(3000);
});