const Comments = require('../models/Comments')

module.exports = async (req,res) =>{    
    await Comments.create({
        ...req.body,
        userid: req.session.userId
    })
    res.redirect('back')

}