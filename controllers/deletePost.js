const BlogPost = require('../models/BlogPost')

module.exports = async (req,res) =>{    
    await BlogPost.findByIdAndDelete(req.params.id)
    console.log(req.params.id)
    res.redirect('/')

}