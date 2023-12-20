const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdOn: {type : Date},
  modifiedOn: {type : Date},
  contactNo: {type : String},
  email: {type : String},
  userId: {type : String, required: true},
  name: {type : String, required: true},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
