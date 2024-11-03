const db = require("../models/database")

async function handleDashboard(req, res) {
    try {
        const query = `SELECT o.ownername, o.owneremail, o.ownerphone, c.carmake, c.carname, c.registernumber, c.status FROM
                        cardetails c, ownerdetails o WHERE o.registernumber = c.registernumber`
        const result = await db.query(query);
        const carDetails = result.rows.map(row => ({
            status: row.status,
            ownername: row.ownername,
            owneremail: row.owneremail,
            ownerphone: row.ownerphone,
            carmake: row.carmake,
            carname: row.carname,
            registernumber: row.registernumber
        }));
        res.send(carDetails);
    } catch (error) {
        return res.status(300).send("Error occured while loading the page")
    }
}

module.exports = handleDashboard;