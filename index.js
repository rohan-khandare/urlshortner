const express = require("express");
const mongoose = require("mongoose");
const urlRoute = require("./routes/url");
const saticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')
const path = require("path");
const URL = require("./models/url");

const cookiePaerser = require("cookie-parser")
const {checkForAuthentication,restrictTo} = require('./middlewares/auth')

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8001;

//seting view engine 
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookiePaerser());
//for every req --pass the function reference, don’t call it.
app.use(checkForAuthentication);

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


//using inline middleware for all url route
// --inline only work for particular route
app.use("/api/url",restrictTo(["NORMAL"]), urlRoute);

app.use("/", saticRoute);
app.use("/user", userRoute);

app.listen(port, () => console.log(`Server started at ${port}`));
