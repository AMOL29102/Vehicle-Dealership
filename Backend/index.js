const express = require("express");
const logResReq = require("./log"); // Import without destructuring
const port = 8000;
const app = express();
const path = require("path");
const cors = require("cors");


//routers
const HomeRoute = require("./routes/home.js");
const Imageroute=require("../Backend/routes/image.js");     
const DetailsRoute  = require("./routes/details.js");
const SpecificPageRoute = require("./routes/specificCar.js");
const DashboardPageRoute = require("./routes/dashboard.js");
const EnquiryRoute = require("./routes/enquiry.route.js");


app.use(cors())
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
app.use("/car",SpecificPageRoute);
app.use("/dashboard",DashboardPageRoute);
app.use("/enquiry", EnquiryRoute);


// Correct `app.listen` without req and res parameters
app.listen(port, () => {
    console.log(`Server connected to port ${port}`);
});