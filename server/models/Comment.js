const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  }
}, { timestamps: true });


const Comment = mongoose.model('Comment', commentSchema, 'Comments');
module.exports = Comment;
