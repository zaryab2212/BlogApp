const mongoose = require("mongoose");

exports.connection = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://jessiep1232:RuCaCHz0o1llwHAV@blogapp.ysghny1.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("DB is connected");
  } catch (error) {
    console.log("db connection error");
  }
};

//RuCaCHz0o1llwHAV
