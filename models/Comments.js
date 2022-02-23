const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    comment:String,
    datePosted:{
        type:Date,
        default:new Date()
    },
    username: {
        type: String,
        required:true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
});

const Comments = mongoose.model('Comments', CommentsSchema);
module.exports = Comments