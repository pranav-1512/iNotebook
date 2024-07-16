const jwt = require('jsonwebtoken')
const JWT_SECRET = 'thisismysecretkey'

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(404).json({
            message: 'Please Login'
        })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    } 
    catch (error) {
        return res.status(401).json({
            message: 'Please Login'
        })
    } 
}
module.exports = fetchuser
