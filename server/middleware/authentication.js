const mongoose = require("mongoose");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const { sessionId } = req.headers;
  if (!sessionId || !mongoose.isValidObjectId(sessionId)) return next();

  const user = await User.findOne({ "sessions._id": sessionId });
  if (!user) return next();
  req.user = user;
  return next();
};

module.exports = { authenticate };
