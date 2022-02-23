module.exports = (req,res)=>{
    if(req.session.userId == "6215d97fe2d27da4734b9c19"){
        res.render('addpost',{
            createPost:true
        })
    }
    res.redirect('auth/login')

}

