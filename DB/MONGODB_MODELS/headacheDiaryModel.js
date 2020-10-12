const { Mongoose } = require("mongoose");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const headacheSchema = Schema({
    location: String,
    severity: String,
    duration: String, 
    trigger: String, 
    medication: String,
    improvement: String,
    date: {
        type: Date,
        default: Date.now
    }
})

const headacheModelDiary = mongoose.model("headacheDiary", headacheSchema)

module.exports = headacheModelDiary