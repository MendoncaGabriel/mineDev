const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  user: {
    type: String,
   
  },
  pass: {
    type: String,
 
  }
})

const admin = mongoose.model('admin', adminSchema);

module.exports = admin;
