const mongoose = require("mongoose");

const app = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
        
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
        enum:['Application','Game'],
        type:String
    },
    category:{
        enum:['Health','Education','Entertainment'],
        type:String
    },
    email:{
        type:String,
        required:true
    },
    website:{
        type:String,
    },
    releasename:{
        type:String,
        default:1.0
    },
    newfeature:{
        type:String
    },
    apkpath:{
        type:String,
        required:true
    },
    privacy:{
        type:String
    }
})

module.exports=mongoose.model("Appdata",app);