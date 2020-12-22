// This file has declaration for the user role schema in mongodb
// I assume this class is for authorization 

const Joi = require('joi');
const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
    role:{
        type: String,
        required: true,
        unique: true
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

const UserRole = mongoose.model('UserRole', userRoleSchema);

function validateUserRole(userRole) {
  const schema = {
    role: Joi.string().required()
  };

  return Joi.validate(userRole, schema);
}

exports.UserRole = UserRole; 
exports.validate = validateUserRole;