const mongoose = require("mongoose");

const courseSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter the Course name."],
        trim:true
    },
    description:{
        type:String
    },
    started:{
        type:Boolean,
        default:false
    },
    doneTracks:{
        type:Number,
        default:0,
    },
    tracks:[
        {
            name:{
                type:String,  
                required:[true,"Please Enter the Track name."]
            },
            done:{
                type:Boolean,
                default:false
            },
            bookmark:{
                type:Boolean,
                default:false
            },
            notes:{
                type:String,
            },
            url:{
                type:String,
            }

        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Course",courseSchema)