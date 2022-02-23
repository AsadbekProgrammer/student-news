const BlogPost = require('../models/BlogPost')
const path = require('path')
const cryptoJS = require('crypto-js')

const encrypt = (text) => {
    return cryptoJS.enc.Base64.stringify(cryptoJS.enc.Utf8.parse(text));
};

module.exports = async (req,res) =>{    
    let image = req.files.image
    image.mv(path.resolve(__dirname,'..','public/img', encrypt(image)+image.name),
        async (error)=>{
            await BlogPost.create({
                ...req.body,
                image:'/img/' + encrypt(image) + image.name,
                userid: req.session.userId
            })
            res.redirect('/')
        })

}