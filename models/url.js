const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortId: {
       type : String,
       required :true,
       unique: true
    },
    redirectUrl: {
        type: String,
        required:true
    },
    //array of timestaps 
    visitHistory:[{timestamp:{ type: Number}}],
   
    //works like foreign key
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

}, {timestamps:true});

const URL = mongoose.model("url",urlSchema);
module.exports = URL;

