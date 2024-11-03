const express = require("express")
const {handleGetMaintainanceDetails,handlePostMaintainanceDetails} = require("../adminControllers/maintainance.controller")
const upload = require("../middlewares/multer.middleware")

const router = express.Router();


router.get("/",handleGetMaintainanceDetails);

router.post("/",upload.array("documents",5),handlePostMaintainanceDetails);

module.exports = router;