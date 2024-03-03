const mongoose = require('mongoose');

const reportsTo = {
  name : String,
  id : String,
  designation : String,
  territory : String
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdOn: {type : Date},
  modifiedOn: {type : Date},
  contactNo: {type : String},
  email: {type : String},
  userId: {type : String, required: true, unique : true},
  name: {type : String, required: true},
  reportsTo : reportsTo,
  userType : { type : String, required: true },
  territory : { type : String}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
