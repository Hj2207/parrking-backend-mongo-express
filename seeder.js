const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });
const User = require('./models/User');
const ParkingZone = require('./models/ParkingZone');
const ParkingSpace = require('./models/ParkingSpace');
const VehicleParking = require('./models/VehicleParking');

// Connect to DB
mongoose.connect(process.env.MONG_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
  );
  const parkingZone = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/parkingZone.json`, 'utf-8')
  );
  const parkingSpace = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/parkingSpace.json`, 'utf-8')
  );
  const vehicleParking = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/vehicleParking.json`, 'utf-8')
  );

  // Import into DB
const importData = async () => {
    try {  
      await User.create(users); 
      // await ParkingZone.create(parkingZone);
      // await ParkingSpace.create(parkingSpace);
      // await VehicleParking.create(vehicleParking);
      console.log('Data Imported...');
      process.exit();
    } catch (err) {
      console.error(err);
    }
  };
  // Delete data
const deleteData = async () => {
    try {
      /* await User.deleteMany(); */
      await ParkingZone.deleteMany();
      await ParkingSpace.deleteMany();
      await VehicleParking.deleteMany();
      console.log('Data Destroyed...');
      process.exit();
    } catch (err) {
      console.error(err);
    }
  };
  
  if (process.argv[2] === '-i') {
    importData();
  } else if (process.argv[2] === '-d') {
    deleteData();
  }