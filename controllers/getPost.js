const BlogPost = require('../models/BlogPost')
const Comments = require('../models/Comments')
const User = require('../models/User')

module.exports = async(req,res)=>{
    const blogpost = await BlogPost.findById(req.params.id).populate('userid');


    const news = await BlogPost.find({_id: { $ne: req.params.id }}).where({ category: blogpost.category }).limit(2);
    
    
    const comments = await Comments.find({ postId: req.params.id })
    const user = await User.findById(req.session.userId);
    const number = parseInt(blogpost.counter)+1
    await BlogPost.findByIdAndUpdate(req.params.id, {
        counter: number
    })
    res.render('fullpost', {
        blogpost, comments, user, news
   });
}