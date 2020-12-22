// This file has declaration for the user role schema in mongodb
// I assume this class is for authorization 

const Joi = require('joi');
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    img:{
        type: String,
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

const Service = mongoose.model('Service', serviceSchema);

function validateService(userRole) {
  const schema = {
    role: Joi.string().required()
  };

  return Joi.validate(userRole, schema);
}

exports.Service = Service; 
exports.validate = validateService;