const mongoose = require('mongoose');
const Examinee = require('./Examinee');
const ExamAttemptedSchema = new mongoose.Schema({
    examineeId: { type: mongoose.Schema.Types.ObjectId,ref:'Examinee',required:true },
    examId: { type: mongoose.Schema.Types.ObjectId,ref:'Examination',required:true },
    score:{type:Number,default:0},
    totalMarks:{type:Number,default:0},
    passingMarks:{type:Number,default:0},
    status:{type:String,enum:['Passed','Failed'],default:'Failed'},
    resultstatus:{type:String,enum:['Pending','Completed'],default:'Pending'},
    
},{timestamps:true});

module.exports = mongoose.model('Examattempted',ExamAttemptedSchema);