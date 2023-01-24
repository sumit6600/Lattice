const bodyparser = require("body-parser");
const express = require("express");
const db = require("./config/db");
const app = express();
//use express static folder
app.use(express.static("./public"));

// body-parser middleware use
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.get("/" , (req,res) =>{
  res.send("Hello i am there............")
})
app.use("/", require("./routes/index"));
module.exports = app;
