const jwt = require("jsonwebtoken")
require('dotenv').config();


const authenticateToken = (req,res,next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    // console.log("Token", token)
    if(!token) return res.status(401).send("Access Denied");
    // console.log("I");
    
    try{
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded;
            // console.log('Decoded User:', decoded);
            next();
            

    }catch(error){
        console.log(`Error occured : ${error}`)
        return res.status(400).send("Invalid Token")
       
    }
}


const authorizeEmployeeOrAdmin = (req,res,next) => {
    if(!req.user.isAdmin && !req.user.isEmployee) {
        return res.status(403).send("Access Denied this route is for office staff only");
    }
    next();
}

const authorizeDriverOrEmployeeOrAdmin = (req,res,next) => {
    if(!req.user.isAdmin && !req.user.isDriver && !req.user.isEmployee) {
        return res.status(403).send("Access Denied this route is for office staff only");
    }
    next();
}

const authorizeAdmin = (req,res,next) => {
    if(!req.user.isAdmin){
        return res.status(403).send("Access Denied. Only the Admin can access this")
    }
    next();
}

module.exports = {
    authenticateToken,
    authorizeAdmin,
    authorizeDriverOrEmployeeOrAdmin,
    authorizeEmployeeOrAdmin,
}