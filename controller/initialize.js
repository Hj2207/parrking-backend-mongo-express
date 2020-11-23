const fs = require("fs");
const path = require("path");
const ParkingZone = require('../models/ParkingZone');
const ParkingSpace = require('../models/ParkingSpace');
const VehicleParking = require('../models/VehicleParking');
const asyncHandler = require("../middleware/asyncHandler");


// @desc       Initialize the parking zone data
// @route     POST /api/parking/initialize/parkingZoneData
// @access    Public


exports.parkingZoneData = asyncHandler(async (req, res, next) => {
    let reqPath = path.join(__dirname,'..','_data','parkingZone.json');
    const parkingZone = JSON.parse(
       
        fs.readFileSync(`${reqPath}`, 'utf-8')
    );
    await ParkingZone.create(parkingZone);
    
    res.status(200).json({ success: true });
  });

  // @desc       Initialize the parking spaces data
// @route     POST /api/parking/initialize/parkingSpacesData
// @access    Public


exports.parkingSpacesData = asyncHandler(async (req, res, next) => {
    let reqPath = path.join(__dirname,'..','_data','parkingSpace.json');
    const parkingSpace = JSON.parse(
      fs.readFileSync(`${reqPath}`, 'utf-8')
    );
    await ParkingSpace.create(parkingSpace);
    
    res.status(200).json({ success: true });
  });

// @desc      Remove all transactional data: cleares all allocated spaces and Vehicle bookings
// @route     PUT /api/parking/initialize/deallocate
// @access    Public

exports.deallocate = asyncHandler(async (req, res, next) => {
  await ParkingSpace.updateMany({ },
    {vehicleNumber:null},{
        new: true,
        runValidators: true
      });
  await VehicleParking.deleteMany();
  res.status(200).json({ success: true });
});



  