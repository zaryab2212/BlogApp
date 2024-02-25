const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createuser = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const salt = 10;
    const newUser = await User.findOne({ email });
    // if (newUser) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "User alrady exist",
    //   });
    // }
    const hashedPass = await bcrypt.hashSync(password, salt);

    req.body = { ...req.body, password: hashedPass };

    const saveUser = await new User({ ...req.body });
    await saveUser.save();

    res.status(201).json({
      success: true,
      message: "user create successfull",
      saveUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
      message: "Unabel to Create User",
    });
  }
};
exports.loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const JWT_SECRET = "KDFJKDJKFDJFKDJ";

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "User doest exist",
      });
    }
    const verifyPass = await bcrypt.compare(password, findUser.password);

    if (!verifyPass) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: email }, JWT_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .json({
        success: true,
        message: "user create successfull",
        findUser,
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
      message: "Unabel to login User",
    });
  }
};
exports.logOutuser = async (req, res) => {
  try {
    res.status(200).cookie("token", null).json({
      success: true,

      message: "User Loged Out",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
      message: "Unabel to Create User",
    });
  }
};
exports.userProfile = async (req, res) => {
  try {
    const token = req.cookies.token;

    const JWT_SECRET = "KDFJKDJKFDJFKDJ";
    const userId = await jwt.verify(token, JWT_SECRET);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "not vailed token",
      });
    }

    const user = await User.findOne({ email: userId.userId });

    res.status(200).json({
      success: true,
      user,
      message: "User Loged Out",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
      message: "Unabel to fetch user",
    });
  }
};
exports.activeUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(400).json({
        success: false,

        message: "try logingIn again with corract credentals",
      });
    }

    res.status(200).json({
      success: true,
      user,
      message: "active user fetched",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
      message: "Unabel to active fetch user",
    });
  }
};
