const express = require('express')
const dotenv = require("dotenv")
const cors = require('cors')
//loading env vars this should be kept at top
dotenv.config({ path: "./config/config.env" });
const mongooseDb = require("./db.js");

mongooseDb();
const auth = require("./route/auth");
const parkingZone = require('./route/parkingZone.js');
const initialize = require('./route/initialize.js');
const booking  = require('./route/booking.js');
const app = express();

//body parser
app.use(express.json());
//added for cross origin request
app.use(cors())
app.use("/api/parking/auth", auth);
app.use("/api/parking/getParkingSpace", parkingZone);
app.use("/api/parking/initialize", initialize);
app.use("/api/parking/parkingSpace", booking)

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Hi server is running in ${process.env.NODE_ENV} mode in port ${PORT}`
  )
);

// Handler for unhandled proise rejection

process.on("unhandledRejection", (err, promise) => {
    console.log(`Err: ${err.message}`);
    //close server and exit process
    server.close(() => process.exit(1));
  });