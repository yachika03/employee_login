const express = require('express');
const route = express.Router();
const employeeController=require("../controller/employee")
route.post("/register",employeeController.createEmployee)
route.put("/employee/:employeeId",employeeController.updateEmployee)
route.delete("employee/delete/:employeeId",employeeController.deleteEmployee)
route.all("/*", function (req, res) {
    res.status(400).send({status: false,message: "The api you request is not available"})
})
module.exports = route;