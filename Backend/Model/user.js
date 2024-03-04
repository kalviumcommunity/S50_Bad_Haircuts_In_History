const mongoose=require("mongoose")

let userSchema = new mongoose.Schema({
    "User_ID": Number,
    "User_Name": String,
    "Email": String,
    "Password": String,
    "created_at":String,
})


let postSchema = new mongoose.Schema({
    "User_ID": Number,
    "Post_ID": Number,
    "User_Name": String,
    "title": String,
    "content": String,
    "media_url": String,
    "created_at":String,
})


const usermodel =mongoose.model("USER_DETAIL",userSchema)
const postmodel =mongoose.model("POST",postSchema)

module.exports ={usermodel,postmodel};
