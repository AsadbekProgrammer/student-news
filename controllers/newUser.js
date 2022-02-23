module.exports = (req,res) =>{
    var name=""
    var lastname=""
    var username = ""
    var password = ""
    var email = ""
    const data = req.flash('data')[0];

    if(typeof data != "undefined"){
        name = data.name
        lastname = data.lastname
        username = data.username
        password = data.password
        email = data.email
    }

    res.render('register', {
        errors: req.flash('validationErrors'),
        name: name,
        lastname: lastname,
        username: username,
        password: password,
        email: email
    })
}