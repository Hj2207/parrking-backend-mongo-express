
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../util/ErrorResponse");
const ParkingZone = require("../models/ParkingZone");
const ParkingSpace = require("../models/ParkingSpace")

// @desc      Get all parking Spaces of a parking zone
// @route     GET /api/v1/bootcamps/:parkingZone
// @access    Public

exports.getParkingSpace = asyncHandler(async (req, res, next) => {
 
    const parkingspaces = await ParkingZone.find({parking_zone_title: req.params.parkingZone}).populate('parking_space');  
    if (!parkingspaces) {
      return next(
        new ErrorResponse(`No allocated Parking Spaces of ${req.params.parkingZone}`, 404)
      );
    }
    res.status(200).json({ success: true, data: parkingspaces });
  });




