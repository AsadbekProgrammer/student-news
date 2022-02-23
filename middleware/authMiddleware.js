const User = require('../models/User')

module.exports = (req,res,next) => {
    User.findById("6215d97fe2d27da4734b9c19", (error,user)=>{
        if(error || !user)
            return res.redirect('/')

        next()    
    })
}