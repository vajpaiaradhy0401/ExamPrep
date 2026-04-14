const mongoose = require('mongoose');
const Question = require('./Question');

const messageSchema = new mongoose.Schema({
    question:{
        type:String
    },
    answer:{
        type:String
    },
    examineeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Examinee",
    }
})
module.exports = mongoose.model("Message",messageSchema)