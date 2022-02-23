const bcrypt = require('bcrypt');
const { is } = require('express/lib/request');
const User = require('../models/User')

module.exports = (req,res)=>{
    const {username, password} = req.body;
    
    User.findOne({username:username}, (error,user)=> {
        if(user){
            bcrypt.compare(password, user.password, (error,same)=>{
                if(same){
                    req.session.userId = user._id
                    req.session.name = user.name
                    req.session.lastname = user.lastname
                    res.redirect('/')
                }
                else{
                    res.redirect('/auth/login')
                }
            })
        }
        else {
            res.redirect('/auth/login')
        }
    })
}