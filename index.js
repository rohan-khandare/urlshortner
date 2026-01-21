const express = require("express");
const mongoose = require("mongoose");
const urlRoute = require("./routes/url");
const saticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')
const path = require("path");
const URL = require("./models/url");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8001;

//seting view engine 
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// DB connection
mongoose
  .connect( 
    process.env.MONGOURL
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));



app.get("/test", async (req,res)=>{
  const allurls = await URL.find({});
  return res.render("test",{urls : allurls})
})



app.use("/api/url", urlRoute);
app.use("/",saticRoute);
app.use("/user",userRoute);

app.listen(port, () => console.log(`Server started at ${port}`));
