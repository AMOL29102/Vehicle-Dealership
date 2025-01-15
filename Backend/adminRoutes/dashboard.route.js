// const express = require("express");
// const handleDashboard = require("../adminControllers/dashboard.controller");
// const { handleSellCar, getSoldCarDetails, getTotalSellingPrice } = require("../adminControllers/sellcar.controller")
// const {handleGetImages,handleDeleteImage}  = require("../controllers/s3ImageFunctions.controller")
// const { authenticateToken, authorizeEmployeeOrAdmin } = require("../controllers/userRole-auth");

// const router = express.Router();

// router.get("/", authenticateToken, authorizeEmployeeOrAdmin, handleDashboard);
// router.post("/sell-car", authenticateToken, authorizeEmployeeOrAdmin, handleSellCar);
// router.get('/total-selling-price', getTotalSellingPrice);
// // router.get("/get-images", handleGetImages);
// router.delete("/delete-notice", authenticateToken, authorizeEmployeeOrAdmin, handleDeleteImage)
// router.get("/sold-cars", authenticateToken, authorizeEmployeeOrAdmin, getSoldCarDetails)

// module.exports = router;

const express = require("express");
const {handleDashboard} = require("../adminControllers/dashboard.controller");
const { handleSellCar, getSoldCarDetails, getTotalSellingPrice } = require("../adminControllers/sellcar.controller")
const { handleChangePassword } = require("../adminControllers/changepassword.controller")
const {handleGetImages,handleDeleteImage}  = require("../controllers/s3ImageFunctions.controller")
const { authenticateToken, authorizeEmployeeOrAdmin, authorizeAdmin } = require("../controllers/userRole-auth");
const { roundToNearestHours } = require("date-fns/roundToNearestHours");

const router = express.Router();

router.get("/", authenticateToken, authorizeEmployeeOrAdmin, handleDashboard);
router.get('/total-selling-price', getTotalSellingPrice);
router.get("/sold-cars", authenticateToken, authorizeEmployeeOrAdmin, getSoldCarDetails);

router.delete("/delete-notice", authenticateToken, authorizeEmployeeOrAdmin, handleDeleteImage)

// router.post("/",authenticateToken,authorizeEmployeeOrAdmin,handlepushtoHomepage)
router.post("/change-password",authenticateToken,authorizeAdmin,handleChangePassword);
router.post("/sell-car", authenticateToken, authorizeEmployeeOrAdmin, handleSellCar);


module.exports = router;