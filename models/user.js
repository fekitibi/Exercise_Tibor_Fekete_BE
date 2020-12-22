// This file has declaration for the user schema in mongodb and its validation function
const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    active: {
      type: Boolean,
      default: false
    },
    profile_pic:{
      type: String
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    user_role_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    phone_number:{
      type: String
    },
    address:{
      type: String,
      required: true
    },
    zip_code:{
      type: String,
      required: true
    },
    city:{
      type: String,
      required: true
    },
    created_at:{
      type: Date,
      required: true
    },
    updated_at:{
      type: Date,
      required: true
    }
});

// Generating the json web token for the user with this function using the jtwPrivateKey env variable
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, user_role_id: this.user_role_id}, config.get('jtwPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    active: Joi.boolean(),
    profile_pic: Joi.string(),
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    user_role_id: Joi.string(),
    password: Joi.string().min(5).max(255).required(),
    phone_number: Joi.string(),
    address: Joi.string().min(5).max(50).required(),
    zip_code: Joi.string().min(4).max(6).required(),
    city: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;