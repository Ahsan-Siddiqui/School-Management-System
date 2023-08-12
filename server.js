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
app.use('/api/contacts',require('./routes/contacts'))
app.use('/api/classes',require('./routes/classes'))
app.use('/api/Student',require('./routes/student'))
app.use('/api/Teacher',require('./routes/teacher'))
app.use('/',(req,res)=>{
    res.send("Welcome to the Student Management App")
})

//PORT

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`)
})