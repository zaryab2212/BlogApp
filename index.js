const express = require("express");
const cors = require("cors");
const { connection } = require("./database/db");
const userRouter = require("./routes/user");
const postRouter = require("./routes/posts");
const bodyParser = require("body-parser");
const { Authorized } = require("./services/Autorized");
const cookieParser = require("cookie-parser");
const path = require("path");
const cloudinary = require("cloudinary");

const app = express();

//middleware

app.use(
  cors({
    origin: "https://blog-app-by-zzaryab.vercel.app",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
  // {

  //   origin: "https://blog-app-by-zzaryab.vercel.app", // Specify a specific origin
  //   methods: "GET,POST,PUT,DELETE", // Specify allowed methods
  //   allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
  // }
);
// app.use(express.static(path.join(__dirname, "/build")));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "build")));
app.use("/uploads", express.static(__dirname + "/uploads"));

//routes
app.use("/auth", userRouter);

//   try {
//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(
//       req.file.buffer.toString("base64")
//     );

//     // Save Cloudinary URL or other details to your MongoDB if needed
//     const imageUrl = result.url;
//     // ... save imageUrl to your database

//     res.json({ imageUrl });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to upload image" });
//   }
// });

app.use("/posts", postRouter);

//db connection
connection();

//port
const port = 8080;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
