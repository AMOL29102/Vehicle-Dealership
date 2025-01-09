// const bcrypt = require("bcrypt")
const db = require("../models/database");
const { generateAdminToken, generateDriverToken, generateEmployeeToken } = require("../middlewares/auth-jwt");
const saltRounds = 10;

async function handleUserRegistration(req,res) {
    const {userID,userName,userPassword,userDesignation} = req.body;
    const {isAdmin , isEmployee, isDriver} = req.query;
    try{
        const checkUserQuery = `SELECT * FROM users WHERE userID = $1 OR userName = $2`;
        const checkValues = [userID, userName];
        const existingUser = await db.query(checkUserQuery, checkValues);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "User with the same userID already exists." });
        }
        // const hashedPassword = await bcrypt.hash(userPassword,saltRounds);
        const query = `INSERT INTO users (userID, userName, userPassword, userDesignation) VALUES ($1,$2,$3,$4) RETURNING *`;
        // const values = [userID,userName,hashedPassword,userDesignation]
        const values = [userID,userName,userPassword,userDesignation]

        const user = await db.query(query,values);
        if(isAdmin){
           return  res.json(generateAdminToken(user.rows[0]));
        }
        if(isDriver){
            return res.json(generateDriverToken(user.rows[0]));
        }
        if(isEmployee){
            return res.json(generateEmployeeToken(user.rows[0]));  
        }
        
    }
    catch(error){
        console.log(`Error Occured is : ${error}`);
       return res.status(401).send("Unexpected Error Occured");
    }
}

async function handleUserLogin(req,res) {
    const {userID,userPass} = req.body;
    try{
        if(!(userID,userPass)) {
            return res.status(400).send("Enter the details");
        }
        const query = `SELECT * FROM users where userid = $1`
        const values = [userID];

         
        const user = await db.query(query,values);
        const userDetails = user.rows[0];

        if(!userDetails){
            return res.status(400).send("User does not exists");
        }

        //console.log(userDetails );
        // const result = await bcrypt.compare(userPass,userDetails.userpassword);
        
        if(userPass != userDetails.userpassword) {
            return res.status(401).send("Access Denied");
        }


        let token;
        if(userDetails.userdesignation === 'Admin'){
            token = generateAdminToken({userID: userDetails.userID, username: userDetails.username,password: userDetails.userPassword});
        }
        if(userDetails.userdesignation === 'Employee'){
            token = generateEmployeeToken({userID: userDetails.userID, username: userDetails.username, password: userDetails.userPassword});
        }
        if(userDetails.userdesignation === 'Driver'){
            token = generateDriverToken({userID: userDetails.userID, username: userDetails.username, password: userDetails.userPassword});
        }
        console.log(token)
        res.setHeader('Authorization' , `Bearer ${token}`);
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        return res.json(token);
    }catch(error){
        console.log(`Error occured is : ${error}`);
        res.status(400).send("There has been an error in the login process")
    }

}

module.exports = {
    handleUserLogin,
    handleUserRegistration
}