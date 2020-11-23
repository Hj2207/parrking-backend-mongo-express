const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../util/ErrorResponse");
const ParkingZone = require("../models/ParkingZone");
const ParkingSpace = require("../models/ParkingSpace");
const VehicleParking = require("../models/VehicleParking");
const moment = require('moment');

// @desc      Book a parking space
// @route     PUT /api/parking/parkingSpace/book
// @access    Public

exports.bookingSpace = asyncHandler(async (req, res, next) => {

    const{parkingSpace, vehicleNumber, bookingFrom, bookingTo} = req.body;
 
    const bookedSpace = await ParkingSpace.findOneAndUpdate({parking_space_title:parkingSpace},
        {vehicleNumber:vehicleNumber},{
            new: true,
            runValidators: true
        }) ;
     const {_id,parking_zone_id } =   bookedSpace;

     
     const bookedSlot={
       parking_zone_id: parking_zone_id,
       parking_space_id:_id,
       booking_date_time: moment.utc(bookingFrom),
       release_date_time: moment.utc(bookingTo)
     };
     const updated= await VehicleParking.create(bookedSlot);

    if (!bookedSpace || !updated) {
      return next(
        new ErrorResponse(`Booking can't be completed, Try again later`, 404)
      );
    }
    res.status(200).json({ success: true, data: bookedSpace });
  });


  
// @desc      Release a parking space
// @route     PUT /api/parking/parkingSpace/release
// @access    Public

exports.releaseSpace = asyncHandler(async (req, res, next) => {

    const{parkingSpace} = req.body;

    const releasedSpace = await ParkingSpace.findOneAndUpdate({parking_space_title: parkingSpace},
        {vehicleNumber:null},{
            new: true,
            runValidators: true
          });
    const {_id} = releasedSpace;
    await VehicleParking.findOneAndDelete({parking_space_id: _id})

    if (!releasedSpace) {
      return next(
        new ErrorResponse(`Release can't be completed, try again later`, 404)
      );
    }
    res.status(200).json({ success: true, data: releasedSpace });
  });

// @desc      Generate Report
// @route     POST /api/parking/parkingSpace/generateReport
// @access    Public

exports.generateReport = asyncHandler(async (req, res, next) => {

  const{bookingFrom, bookingTo} = req.body;

  const booking_date_time=moment.utc(bookingFrom);
  const release_date_time= moment.utc(bookingTo);

  const report= await VehicleParking.find({booking_date_time: {$gte: booking_date_time}, release_date_time:{ $lte:release_date_time}}).populate('parking_zone_id').populate('parking_space_id') 
  const data=report.map(parkingData=>{
    const {parking_zone_title}=parkingData.parking_zone_id
    const {parking_space_title}=parkingData.parking_space_id
    return{
      parkingZone:parking_zone_title,
      parkingSpace:parking_space_title
    }
  })
  if (!report) {
    return next(
      new ErrorResponse(`Error while generationg report, Try again later`, 404)
    );
  }
  res.status(200).json({ success: true, data: data });
});
