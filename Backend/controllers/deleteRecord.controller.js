const db = require("../models/database")

async function handleRecordDeletion(req,res) {
    const registerNum = req.params.registrationnumber;
    //console.log(req.params);

    //console.log("Inside handleRecordDeletion function");

    //console.log(registerNum);
    try{
        const query = `delete from cardetails where registernumber = ($1)`;
        const values = [registerNum];
        await db.query(query,values);

        res.status(200).send("Car Records deleted successfully");
    }
    catch(error){
        console.log(`The following error has occured : ${error}`);
    }
    
}

module.exports = handleRecordDeletion;