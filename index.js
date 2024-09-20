const express = require("express");
const logResReq = require("./log"); // Import without destructuring
const port = 8000;
const app = express();
const path = require("path");




//routers
const HomeRoute = require("./routes/home.js")
const Imageroute=require("../Backend/routes/image.js")
const DetailsRoute  = require("./routes/details.js");

app.set("view engine","ejs");
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.set('views',path.resolve("./views"));

// Use your custom logging middleware
app.use(logResReq("logs.txt"));

// Using Routes
app.use("/",HomeRoute)
app.use("/upload",Imageroute);
 app.use("/details",DetailsRoute);


// Correct `app.listen` without req and res parameters
app.listen(port, () => {
    console.log(`Server connected to port ${port}`);
});
