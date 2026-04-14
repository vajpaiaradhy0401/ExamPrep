const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());
const URL ='mongodb://localhost:27017/examprep'

mongoose.connect(URL)
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((er)=> {
    console.log(`Error is ${er}`)
});

// api start

app.use('/api/examinee',require('./routes/examineeRoute'))
app.use('/api/admin',require('./routes/adminRoute'))

// session api
app.use('/api/session/',require('./routes/sessionRoute'))
// subject api
app.use('/api/subject',require('./routes/subjectRoute'))
// question api
app.use('/api/question/',require('./routes/questionRoute'))
// exam api
app.use('/api/exams/',require('./routes/examinationRoute'))
// message api
app.use('/api/message',require('./routes/messageRoute'))

// api end
app.listen(5000,()=>{
    console.log('Server is running on http://localhost:5000');
})
