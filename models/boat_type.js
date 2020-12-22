const Joi = require('joi');
const mongoose = require('mongoose');

const boatTypeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: true,
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

const BoatType = mongoose.model('BoatType', boatTypeSchema);

function validateBoatType(boatType) {
  const schema = {
    role: Joi.string().required()
  };

  return Joi.validate(boatType, schema);
}

exports.BoatType = BoatType; 
exports.validate = validateBoatType;