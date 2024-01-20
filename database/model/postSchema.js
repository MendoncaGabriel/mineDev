const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  metadata: {
    title: String,
    cover: String,
    description: String,
    author: String,
    publicationDate: String,
    categories: [String], 
    keywords: [String],
    views: {
      type: Number,
      default: 0,
    },
  },
  content: Array,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
