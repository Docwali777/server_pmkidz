require('dotenv').config();



const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}) .then(()=>console.log("Connected to DB"))
.catch(e=> console.log("Error connecting to DB"))


// require("./MONGODB_MODELS/headacheDiaryModel")
// require("./MONGODB_MODELS/UserModel")