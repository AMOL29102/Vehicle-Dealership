require("dotenv").config();
const jwt = require("jsonwebtoken")



const generateAdminToken = ({userID, username, password}) =>{
    return jwt.sign({userID, username, password, isAdmin :true},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'6h'});
}

const generateEmployeeToken = ({userID, username, password}) =>{
    const token =  jwt.sign({userID,username, password, isEmployee :true},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'6h'});
    console.log("token");
    return token;
}

const generateDriverToken = ({userID, username, password}) =>{
    return jwt.sign({userID,username, password, isDriver :true},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'6h'});
}


module.exports = {
    generateAdminToken,
    generateEmployeeToken,
    generateDriverToken
}