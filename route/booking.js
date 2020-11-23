const express = require("express");
const {bookingSpace,releaseSpace,generateReport} = require("../controller/booking");

const router = express.Router();

router.put("/book", bookingSpace);
router.put("/release",releaseSpace);
router.post("/generateReport", generateReport)
module.exports = router;