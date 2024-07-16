const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const JWT_SECRET = 'thisismysecretkey'

const fetchuser = require('../middleware/fetchuser')

// Create a user
router.post('/createuser', async(req,res)=>{
    const { name, email, password } = req.body
    let success = false
    try{
        const user = await User.findOne({ email: email})
        if(user){
            return res.status(401).json({
                success,
                message: 'User Exists'
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const curruser = new User({name: name, email: email, password: hashedpassword})
        await curruser.save()
        const data = {
            curruser:{
                id: curruser.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        return res.status(201).json({
            success,
            authtoken
        })

    }
    catch(err){
        return res.status(501).json({message:'Internal Server Error'})
    }
})

// Login
router.post('/login', async (req,res)=>{
    const { email, password } = req.body
    let success = false

    // Find if user with that email exists
    const user = await User.findOne({ email: email})
    if(!user){
        return res.status(404).json({
            success,
            message: 'User does not exist'
        })
    }

    // User exists, compare the passwords and send the jwt token
    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare){
        return res.status(401).json({
            success,
            message: 'Invalid Credentials'
        })
    }

    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    success = true
    // const authtoken = jwt.sign(user,JWT_SECRET)
    return res.status(201).json({ success, authtoken })
})

router.get('/getuser', fetchuser, async (req,res)=>{
    try{
        userId = req.user.id
        const user = await User.findById(userId).select('-password')
        return res.status(201).json({
            user
        })
    }
    catch(err)
    {
        return res.status(404).json({
            message:'Internal Server Error'
        })
    }
})

module.exports = router