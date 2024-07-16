const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
const port = 5000

const app = express()
const url = "mongodb+srv://admin:admin@cluster0.fevlv0t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const user = require('./routes/auth')
const notes = require('./routes/notes')

// app.use(cors())
app.use(cors(
    {
        origin: [],
        methods: ["POST","GET"],
        credentials: true
    }
))
app.use(express.json())

mongoose.connect(url)
const con = mongoose.connection
con.on('open', ()=>{
    console.log("Connected to db")
})

app.get("/",(req,res)=>{
    res.json("Hello")
})
app.use('/api/user', user)
app.use('/api/notes', notes)
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})