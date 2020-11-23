const express = require("express");
const {parkingZoneData, parkingSpacesData, deallocate} = require("../controller/initialize");
const { route } = require("./auth");


const router = express.Router();

router.get("/parkingZoneData", parkingZoneData);
router.get("/parkingSpacesData", parkingSpacesData);
router.put("/deallocate", deallocate)

module.exports = router;