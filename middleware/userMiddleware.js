module.exports = (req,res,next)=>{
    if(req.body.comment == null){
        return res.redirect('/')
    }
    next()
}
