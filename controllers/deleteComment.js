const Comments = require('../models/Comments')

module.exports = async (req,res) =>{    
    await Comments.findByIdAndDelete(req.body.commentId)
    res.redirect('back')

}