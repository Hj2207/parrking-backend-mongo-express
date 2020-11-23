const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../util/ErrorResponse");


// @desc      Login user
// @route     POST /api/parking/auth/login
// @access    Public


exports.login = asyncHandler(async (req, res, next) => {
    //fetching values from request
    const { email,type, password } = req.body;
      // Validate emil & password
    if (!email || !password) {
      return next(new ErrorResponse("400", `Please enter email and password`));
    }
  
    //+password is used because we had made select false in User.js model
    const user = await User.findOne({
      email,
    }).select("+password");
  
    if (!user) {
      return next(new ErrorResponse("400", `Invalid credentials`));
    }
  
    const validate = await user.matchPassword(password);
    if (!validate) {
      return next(new ErrorResponse("400", `Invalid credentials`));
    }
    res.status(200).json({ success: true, data:{name:email,userType:type} });
  });