//const express = require('express')
const db = require('../models/database')
const cloudin = require("./cloud.controller.js")

async function handleImageUpload(req,res){
    const carNumber = req.body.carNumber;
    //console.log(req.body);
    if(!req.files){
        return res.status(400).send("No files uploaded");
    }

    try{
        imageUrls = []
        for(const file  of req.files){
            const filepath = file.path;
            const result = await cloudin(filepath);
            imageUrl = result.secure_url;
            imageUrls.push(imageUrl);   
        }
        const query = `INSERT INTO  images (carNumber,image_urls) VALUES ($1,$2)`
            const values = [carNumber,imageUrls];
            await db.query(query,values);  
        res.send("Images uploaded successfully")

    }
    catch(error){
        console.log(`${error} : Error occured while uploadind the file`)
    }
}

module.exports = handleImageUpload;