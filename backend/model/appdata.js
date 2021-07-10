const mongoose = require("mongoose");

const app = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        // required:true
        
    },
    screenshots:{
        data:Buffer,
        contentType:String
    },
    icons:{
        data:Buffer,
        contentType:String
    },
    apptype:{
        type:String
    },
    category:{
        type:String
    },
    email:{
        type:String,
        // required:true
    },
    website:{
        type:String,
    },
    releasename:{
        type:String,
        required:true,
        default:1.0
    },
    packageurl:{
        type:String,
        required:true
    },

    whatisnew:{
        type:String
    },
    apkpath:{
        type:String,
        required:true
    },
    nofoversion:{
        type:Number,
        default:1
    }
},{timestamps: true})

module.exports=mongoose.model("Appdata",app);