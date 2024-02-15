const mongoose=require("mongoose")

let userSchema = new mongoose.Schema({
    "User_ID": Number,
    "User_Name": String,
    "Email": String,
    "Password": String,
    "created_at":String,
})

const usermodel =mongoose.model("USER_DETAIL",userSchema)

module.exports ={usermodel};