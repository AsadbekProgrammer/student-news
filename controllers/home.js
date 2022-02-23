const BlogPost = require('../models/BlogPost')
const User = require('../models/User')

module.exports = async(req,res)=> {
    const limitValue = req.query.limit || 5;
    const skipValue = req.query.skip || 0;
    const blogposts = await BlogPost.find({}).populate('userid')
    const mostviewed = await BlogPost.find({}).sort({"counter": -1}).populate('userid')

    res.render('index',{
        blogposts, mostviewed
    });
    
}