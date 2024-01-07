const express = require("express");
const cors = require("cors");
const { connection } = require("./database/db");
const userRouter = require("./routes/user");
const postRouter = require("./routes/posts");
const bodyParser = require("body-parser");
const { Authorized } = require("./services/Autorized");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

//middleware
// { origin: "http://localhost:3000/" }
app.use(
  cors({
    origin: "https://blog-app-by-zzaryab.vercel.app", // Specify a specific origin
    methods: "GET,POST,PUT,DELETE", // Specify allowed methods
    allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
  })
);
// app.use(express.static(path.join(__dirname, "/build")));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "build")));
app.use("/uploads", express.static(__dirname + "/uploads"));

//routes
app.use("/auth", userRouter);

app.use("/post", postRouter);
// app.get("/", Authorized, (req, res) => {
//   // res.status(200).json({ ndhjdL: "kfdjkdj" });
// });

//db connection
connection();

//port
const port = 8080;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
