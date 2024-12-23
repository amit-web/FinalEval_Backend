const express = require("express");
const { connectDB } = require("./config/database.js");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json());

const authRouter = require("./routes/auth");

app.use("/",authRouter);



connectDB()
  .then(() => {
    console.log("Database connected successfully!!!");
    app.listen(7777, () => {
      console.log("Server is successfully listenig on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database is not connected");
  });
