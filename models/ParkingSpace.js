const mongoose = require('mongoose');

const ParkingSpaceSchema = new mongoose.Schema({
    parking_space_title: {
        type: String
        },
    parking_zone_id:{
            type: mongoose.Schema.ObjectId,
            ref: "ParkingZone",
            required: true,
          
       },
    vehicleNumber: {
        type: String
    }
});


module.exports = mongoose.model("ParkingSpace", ParkingSpaceSchema);