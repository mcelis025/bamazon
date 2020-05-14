var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect();

showStock();

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
                message: "Enter the ID of the item you would like to purchase."
            }
        ])
        .then(answers => {
            if (questionOne === match.item_id && stockQty >= 1) {
                questionTwo();
            }
            // else there are no more of that item
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

function questionTwo() {
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
/*         if (){

        } */
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


connection.end();
