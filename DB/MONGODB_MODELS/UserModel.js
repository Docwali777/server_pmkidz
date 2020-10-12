

const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: String, 
    headacheDiaries: [
        {
            type: Schema.Types.ObjectId,
            ref: "headacheDiary"
         }
    ]

    
})


UserSchema.statics.addUser =  async function addUser(email){
    const existingUser = await UserModel.find({email: new RegExp(`${email}`, "gi") })
    if(!existingUser[0]){
        return await UserModel.create({email})
    } else {
        throw Error("User already exists")
    }
}


const UserModel = mongoose.model("user", UserSchema)
module.exports = UserModel