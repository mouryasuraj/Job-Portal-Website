import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:["student","recuiter"],    //If you have options then use enum
        required:true
    },
    profile:{
        bio:{
            type:String
        },
        skills:[
            {
                type:String
            }
        ],
        resume:{
            type:String
        },
        resumeOriginalName:{
            type:String
        },
        company:{
            type:mongoose.Schema.Types.ObjectId, ref:'Company'   //Giving reference to Company model
        },
        profilePhoto:{
            type:String,
            default:""
        }
    }
}, {
    timeStamps:true
});


export const User = mongoose.model('User', userSchema)