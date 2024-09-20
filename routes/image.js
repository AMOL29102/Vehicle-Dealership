const express = require("express");
const handleImageUpload = require("../controllers/image");
const upload = require("../middlewares/multer.middleware");

Imagerouter = express.Router();

Imagerouter.get("/",(req,res)=>{
    return res.render("upload");
})

Imagerouter.post("/",upload.array("images[]",10),handleImageUpload);

module.exports = Imagerouter;
