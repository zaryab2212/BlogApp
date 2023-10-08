const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.Authorized = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const JWT_SECRET = "KDFJKDJKFDJFKDJ";
    const userId = jwt.verify(token, JWT_SECRET);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "not vailed token",
      });
    }

    const user = await User.findOne({ email: userId.userId });

    if (user) {
      req.user = user._id;
    }
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "unable to validate user",
    });
  }
};
