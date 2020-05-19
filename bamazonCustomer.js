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
                /* validate: function (val) {
                    return !isNaN(val) || val.toLowerCase() === "q";
                } */
            }
        ])
        .then(answers => {
            // checkIfShouldExit(val.choice);
            var productChosen = parseInt(answers.questionOne);
            console.log(productChosen);

            connection.query('SELECT * FROM products WHERE item_id = "productChosen"', function (err, res) {
                if (err) throw err;
                for (let i = 0; i < res.length; i++) {
                    console.log(res[i]);
                }
            });

            /*             var item = available(productChosen, inventory);
                        console.log(productChosen);
                        if (productChosen) {
                            questionTwo(productChosen);
                        }
                        else {
                            // else there are no more of that item
                            console.log("\nID entered not valid. Please chose valid ID.");
                        } */

        });
};

/* function questionTwo() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "q2",
                message: "How many items would you like to purchase?"
            }
        ])
        .then(answers => {
            // if there are items then --  
            if (input) {

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

function validateQ1(input) {
    return input !== '';
};

function available(productChosen, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].item_id === productChosen) {
            return inventory[i];
        }
    }
    return null;
}; */

function endConnection() {
    connection.end();
};
