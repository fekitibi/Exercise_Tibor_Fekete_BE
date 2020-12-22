const Joi = require('joi');
const mongoose = require('mongoose');

const engineSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
    },
    brand:{
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

const Engine = mongoose.model('Engine', engineSchema);

function validateEngine(engine) {
  const schema = {
    role: Joi.string().required()
  };

  return Joi.validate(engine, schema);
}

exports.Engine = Engine; 
exports.validate = validateEngine;