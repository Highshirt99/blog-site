const jwt = require("jsonwebtoken")
const User = require("../models/User")

const verify = jwt.verify

const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const {id} = verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(id).select("-password")
      next()
    } catch (error) {
      let err = new Error("Not authorized, token failed.");
      err.statusCode = 401;
      next(error);
    }
  }
  else{
    let error = new Error("Not authorized, no token.")
    error.statusCode = 401;
    next(error);
  }
};

module.exports = authGuard