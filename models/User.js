const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    name: {
        type:String,
        required:[true, 'Ismingizni kiriting!'],
    },
    lastname: {
        type:String,
        required:[true, 'Familiyangizni kiriting!'],
    },
    username:{
        type:String,
        required:[true, 'Foydalanuvchi nomini kiriting!'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Parolingizni kiriting!']
    },
    email:{
        type:String,
        required:[true, 'Email manzilingizni kiriting!'],
        unique:true
    }

});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next){
    const user = this

    bcrypt.hash(user.password, 10, (error,hash)=>{
        user.password = hash
        next()
    })
})

const User = mongoose.model('User', UserSchema);
module.exports = User