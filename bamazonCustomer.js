var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (error) {
    if (error) throw error;
    showStock();
});


function showStock() {
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) throw error;
        console.log('\nProducts Available: \n');

        for (let i = 0; i < results.length; i++) {
            const match = results[i];
            var itemID = "ITEM ID: " + match.item_id;
            var productName = "\nProduct: " + match.product_name;
            var DepartmentName = "\nDepartment: " + match.department_name;
            var price = "\nPrice: $" + match.price;
            var stockQty = "\nQty: " + match.stock_quantity + "\n";
            console.log([itemID, productName, DepartmentName, price, stockQty].join(" "));
        };
        initialQuestion();
    });
};

function initialQuestion() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "questionOne",
                message: "Enter the ID of the item you would like to purchase.",
                validate:
                    function validateID(idNum) {
                        var num = /^\d+$/;
                        return num.test(idNum) || "ID should be a number!";
                    }
            }
        ])
        .then(answers => {
            var productChosen = parseInt(answers.questionOne);

            connection.query('SELECT * FROM products WHERE item_id = ?', [productChosen], function (err, res) {
                if (err) throw err;
                for (let i = 0; i < res.length; i++) {
                    const match = res[i];

                    if (productChosen === match.item_id) {
                        var itemID = "ITEM ID: " + match.item_id;
                        var productName = "\nProduct: " + match.product_name;
                        var DepartmentName = "\nDepartment: " + match.department_name;
                        var price = "\nPrice: $" + match.price;
                        var stockQty = "\nQty: " + match.stock_quantity + "\n";
                        console.log("\nYou chose to purchase:\n\n" + [itemID, productName, DepartmentName, price, stockQty].join(" "));
                        questionTwo();
                    }
                    else {
                        console.log("\nID entered not valid. Please chose valid ID.");
                        initialQuestion();
                    };
                };
            });
        });
};

function questionTwo() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "q2",
                message: "How many items would you like to purchase?",
                validate:
                    function validateID(idNum) {
                        var num = /^\d+$/;
                        return num.test(idNum) || "ID should be a number!";
                    }
            }
        ])
        .then(answers => {
            var numChosen = parseInt(answers.q2);
            if (numChosen > productChosen.stock_quantity) {
                console.log("Insufficient quantity!");
            }
            else {
                connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantity, product.item_id], function (err, res) {
                    if (err) throw err;
                    console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
                    loadProducts();
                }
                );

            }
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
                console.log(error);
            } else {
                // Something else when wrong
            }
        });
};

function endConnection() {
    connection.end();
};
