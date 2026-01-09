const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/url");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8001;

// middleware
app.use(express.json());

// DB connection
mongoose
  .connect( 
    process.env.MONGOURL
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

app.use("/api/url", router);

app.listen(port, () => console.log(`Server started at ${port}`));
