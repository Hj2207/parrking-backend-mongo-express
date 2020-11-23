const mongoose = require('mongoose');

const VehicleParkingSchema = new mongoose.Schema({
    parking_zone_id:{
            type: mongoose.Schema.ObjectId,
            ref: "ParkingZone",
            required: true,     
    },
   parking_space_id:{
        type: mongoose.Schema.ObjectId,
        ref: "ParkingSpace",
        required: true,     
   },
   booking_date_time:{
    type: Date,
    default:Date.now()
   },
   release_date_time:{
    type: Date,
    default:Date.now()
   }
});

module.exports = mongoose.model("VehicleParking", VehicleParkingSchema);