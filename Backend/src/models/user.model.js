import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import addressSchema from "./address.model.js";

const userSchema = new mongoose.Schema({
    fullname :{
        type : String,
        required : true,
    },
    contact :{
        type:String,
        required: false,
        unique:true
    },
    email:{
       type: String,
       required : true,
       unique : true
    },
    password :{
        type : String,
        select : false,
        required : function (){
            return  !this.googleId
        },
    },
    role:{
        type : String,
        required : true,
        enum : ['buyer','seller'],
        default : 'buyer'
    },
    googleId : {
        type : String
    },

   addresses: {
    type: [addressSchema],
    default: [],
    validate: {
        validator: function(v) { return v.length <= 5 },
        message: "Maximum 5 addresses allowed"
    }
}
})




userSchema.pre('save' , async function(){
    if(! this.isModified('password')) return 
    this.password = await bcrypt.hash(this.password , 10)
})


userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password , this.password)
}


const userModel = mongoose.model('user' , userSchema)

export default userModel