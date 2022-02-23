const BlogPost = require('../models/BlogPost')

module.exports = async(req,res)=> {
    const limitValue = req.query.limit || 5;
    const skipValue = req.query.skip || 0;
    const blogposts = await BlogPost.find({category:3}).populate('userid')
    cat_name = 3
    res.render('category',{
        blogposts,
        cat_name
    });
    
}