const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/url");
const MONGOURL = require('.env')
const app = express();
const port = 8001;

// middleware
app.use(express.json());

// DB connection
mongoose
  .connect( 
    MONGOURL
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

app.use("/api/url", router);

app.listen(port, () => console.log(`Server started at ${port}`));
