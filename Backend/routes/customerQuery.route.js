const express = require("express")
const {handleGetQuery,handleNewCustomerQuery,handleDeleteCustomerQuery} = require("../controllers/customerQuery.controller")
const { authenticateToken, authorizeEmployeeOrAdmin,authorizeAdmin } = require("../controllers/userRole-auth");



const customerReviewRouter = express.Router();

customerReviewRouter.get("/",authenticateToken, authorizeEmployeeOrAdmin ,handleGetQuery);

customerReviewRouter.post("/",authenticateToken, authorizeEmployeeOrAdmin , handleNewCustomerQuery);

customerReviewRouter.delete("/",authenticateToken, authorizeEmployeeOrAdmin , handleDeleteCustomerQuery  );


module.exports = customerReviewRouter;