const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Jacksondog1!",
    database: "employeesDB"
  });
  
  connection.connect((err) => {
  if (err) throw err;
   
    console.log("\n Employee Tracker\n");
  menu();
});
  
  
  function menu() {
  
    inquirer
      .prompt({
        type: "list",
        name: "task",
        message: "Menu",
        choices: [
          "Add Employees",
          "Add Roles",
          "Add Departments",
          "View Employee",
          "View Roles",
          "View Departments",
          "Update Employee Roles",
          "End"
        ]
      })
    
    
    .then((answer) => {

       
        switch (answer.action) {
            case "Add Employees":
                addEmployee();
                break;

            case "Add Roles":
                addRole();
                break;

            case "Add Departments":
                addDepartment();
                break;

            case "View Employee":
                viewEmployee();
                break;

            case "View Roles":
                viewRole();
                break;
            case "View Departments":
                ViewDepartment();
                break;
            case "Update employee role":
                updateRole();
                break;
           
        }
    });

  
  }
  
function addEmployee() {
   
    inquirer
        .prompt([{
                name: "firstName",
                type: "input",
                message: "Enter employee first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "Enter employee last name?"
            },
            {
                name: "role_id",
                type: "number",
                message: "Enter employee id #"
            }, {
                name: "manager_id",
                type: "number",
                message: "Enter employee manager id "
            }

        ])
        
        
        .then((answer) => {
          
       
                
                connection.query({ 
                    first_name: answer.firstName,
                    last_name:  answer.lastName,
                    role_id:    answer.role_id,
                    manager_id: answer.manager_id
                }, function(err, res) {
                    if (err) throw err;
                    console.table("First: " + res.firstName + 
                              " || last: " + res.lastName + 
                              " || role: " + res.role_id+ 
                              " || manager: " + res.manager_id);
                            
                              menu();
                            }
                            );
                        });
                };
            
 function addRole() {
      
        inquirer
            .prompt([{
                    name: "employeeType",
                    type: "list",
                    message: "Enter employee title?",
                    choices: 
                    [
                        "manager", 
                        "sales", 
                        "engineer"
                    ]
                },
                {
                    name: "salary",
                    type: "number",
                    message: "Enter salary?"
                },
                {
                    name: "department_id",
                    type: "number",
                    message: "Enter department id?"
                }
            ])
            .then((answer) => {
               
               
                   connection.query({ 
                            title:          answer.employee_type,
                            salary:         answer.salary,
                            department_id:  answer.department_id
                        }, function(err, res) {
                            if (err) throw err;
                            console.table("title: " + res.firstName + 
                                      " || salary: " + res.lastName + 
                                      " || department_id: " + res.role_id);
                                    menu();
                    }
                );
            });
    };

    function addDepartment() {
      
        inquirer
            .prompt([{
                    name: "nameDepartment",
                    type: "input",
                    message: "Enter Department",
                   
                },
                
        
            ])
            .then((answer) => {
               
           connection.query({ 
                        department: answer.name_Department
                    }, function(err, res) {
                        if (err) throw err;
                        console.table(
                            "addDepartment: " + res.name_Department);
                         
                                menu();
                
                 }
                );
            });
    };