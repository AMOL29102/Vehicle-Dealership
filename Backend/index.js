const express = require("express");
const logResReq = require("./log"); // Import without destructuring
const port = 8000;
const app = express();
const path = require("path");
const cors = require("cors");


//routers
const HomeRoute = require("./routes/home.route.js");
const Imageroute = require("../Backend/routes/image.route.js");
const DetailsRoute = require("./routes/carDetails.route.js");
const SpecificPageRoute = require("./routes/specificCar.route.js");
// const DashboardPageRoute = require("./routes/dashboard.js");
// const EnquiryRoute = require("./routes/enquiry.route.js");
const DeleteRecordRoute = require("./routes/deleteRecord.route.js")
const customerQueryRoute = require("./routes/customerQuery.route.js")
const LoginRoute = require("./adminRoutes/userLogin.route.js")
const RegistrationRoute = require("./adminRoutes/userRegistration.route.js")
const DashboardRoute = require("./adminRoutes/dashboard.route.js")
const InsuranceRoute  = require("./adminRoutes/insurance.route.js")
const MaintainanceRoute = require("./adminRoutes/maintainance.route.js")


app.use(cors())
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.resolve("./views"));

// Use your custom logging middleware
app.use(logResReq("logs.txt"));

// Using Routes
app.use("/", HomeRoute)
app.use("/upload", Imageroute);
app.use("/details", DetailsRoute);
app.use("/car", SpecificPageRoute);
// app.use("/dashboard",DashboardPageRoute);
// app.use("/enquiry", EnquiryRoute);
app.use("/delete", DeleteRecordRoute);
app.use("/customer", customerQueryRoute);
app.use("/login", LoginRoute);
app.use("/register", RegistrationRoute);
app.use("/dashboard", DashboardRoute)
app.use("/insurance",InsuranceRoute);
app.use("/maintainance",MaintainanceRoute);


// Correct `app.listen` without req and res parameters
app.listen(port, () => {
    console.log(`Server connected to port ${port}`);
});