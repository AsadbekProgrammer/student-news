const express = require('express')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

mongoose.connect('mongodb+srv://dbAsad:db123312aa@cluster0.8x29x.mongodb.net/my_database',{useNewUrlParser : true})

const app = new express()
const ejs = require('ejs')
const { resourceUsage } = require('process')

const fileUpload = require('express-fileupload')
const validateMiddleWare = require('./middleware/validationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const userMiddleware = require('./middleware/userMiddleware')
const loginMiddleware = require('./middleware/loginMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload())
app.use('/posts/store', validateMiddleWare)
app.use('/delete/:id', authMiddleware)
app.use('/delete/comment', authMiddleware)
app.use('/add/comment', userMiddleware)
app.use(expressSession({
    secret:'shaxrik'
}))
app.use(flash())
global.loggedIn = null
global.adminIn = null

app.use("*", (req,res,next)=>{
    adminIn = "6215d97fe2d27da4734b9c19"
    next()
})

app.use("*", (req,res,next)=>{
    userN = req.session.name
    userL = req.session.lastname
    next()
})
app.use("*", (req,res,next)=>{
    loggedIn = req.session.userId
    next()
})


let port = process.env.PORT;
if(port == null || port == '') {
    port = 3000;
}

app.listen(port, ()=>{
    console.log('App listening on port 3000')
})


const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
const firstController = require('./controllers/firstCategory')
const secondController = require('./controllers/secondCategory')
const thirdController = require('./controllers/thirdCategory')
const contactsController = require('./controllers/contacts')
const commentsController = require('./controllers/comments')
const deletePostController = require('./controllers/deletePost')
const deleteCommentController = require('./controllers/deleteComment')



app.get('/', homeController)

app.get('/category/1', firstController)
app.get('/category/2', secondController)
app.get('/category/3', thirdController)

app.post('/add/comment', commentsController)

app.get('/contacts', contactsController)

app.get('/addpost', authMiddleware, newPostController)

app.post('/delete/comment', deleteCommentController)

app.get('/post/:id', getPostController)

app.get('/delete/:id', deletePostController)

app.post('/posts/store', authMiddleware, storePostController)

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/auth/logout', logoutController)

app.use((req,res)=>res.render('notfound'))