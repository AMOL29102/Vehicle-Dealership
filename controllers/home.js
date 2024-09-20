const db = require("../models/database")

async function handleHomePage(req,res) {
    try{
        const result = await db.query(`
            SELECT DISTINCT ON (c.registernumber) c.registernumber, ci.imageurl 
            FROM cardetails c
            JOIN carimages ci ON c.registernumber = ci.registernumber
            ORDER BY c.registernumber
        `);
        const carsWithImages = result.rows.map(row => ({
            registration_number: row.registernumber,
            image_url: row.imageurl
        }));
        //console.log(carsWithImages);
        res.render("home",{
            carsWithImages
         })
    }catch(error){
        console.log(`${error} : Error occured while loading images`);
    }  
}

module.exports = handleHomePage;