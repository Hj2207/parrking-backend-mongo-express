const mongoose = require('mongoose');

const ParkingZoneSchema = new mongoose.Schema({
    parking_zone_title: {
        type: String,
        enum: ['A', 'B', 'C']
        }

},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Reverse populate with virtuals
ParkingZoneSchema.virtual("parking_space", {
    ref: "ParkingSpace",
    localField: "_id",
    foreignField: "parking_zone_id",
    justOne: false,
  });


module.exports = mongoose.model("ParkingZone", ParkingZoneSchema);

