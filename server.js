const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
require('dotenv').config()
const app = express()
//connect db
connectDB()
app.use(cors())
//define middleware
app.use(express.json({extended:false}))
//define routes
app.use('/api/users',require('./routes/users'))
app.use('/api/auth',require('./routes/auth'))

//Admin Api's
// app.use('/api/contacts',require('./routes/contacts'))
// app.use('/api/classes',require('./routes/assignStudentClass'))
app.use('/api/courses',require('./routes/courses'))
// app.use('/api/assign-course',require('./routes/assignCourse'))
// app.use('/api/student-courses',require('./routes/studenCourses'))
app.use('/api/assignSClass',require('./routes/assignStudentClass'))
// app.use('/api/assignSClass/',require('./routes/assignStudentClass'))

app.use('/api/assignTClass',require('./routes/assignTeacherClass'))
app.use('/api/createClass',require('./routes/createClass'))
app.use('/api/createSubject',require('./routes/createSubject'))
app.use('/api/createTimetable',require('./routes/timeTable'))
app.use('/api/getTimetableDetails',require('./routes/timeTable'))
//Get Single Teacher TimeTable
app.use('/api/getTimetableDetails/teacher',require('./routes/timeTable'))
app.use('/api/assignStudentsClass',require('./routes/attendance'))
app.use('/api/attendance',require('./routes/attendance'))
//Teacher Api's
app.use('/api/teacherForm',require('./routes/teacherForm'))

//Student Api's
app.use('/api/studentForm',require('./routes/studentForm'))

app.use('/',(req,res)=>{
    res.send("Welcome to the Student Management App")
})

//PORT

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`)
})