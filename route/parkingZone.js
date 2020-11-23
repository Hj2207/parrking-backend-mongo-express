const express = require("express");
const {getParkingSpace} = require("../controller/parkingZone");

const router = express.Router();

router.get("/:parkingZone", getParkingSpace);
module.exports = router;