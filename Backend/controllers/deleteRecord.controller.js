const db = require("../models/database")

async function handleRecordDeletion(req, res){
    try {
        const regisNum = req.query.deletedID;
        console.log(regisNum)
        const query = `delete from cardetails where registernumber =($1)`;
        const values = [regisNum];
        await db.query(query, values);

        return res.status(200).send("Record deleted successfully");
    }
    catch (error) {
        console.log(`Error occured while executig the queries : ${error}`);
        return res.status(400).send("Error in Record deletion");

    }

}

module.exports = handleRecordDeletion;