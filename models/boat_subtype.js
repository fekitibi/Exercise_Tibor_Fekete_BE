const Joi = require('joi');
const mongoose = require('mongoose');

const boatSubtypeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: true,
    },
    boat_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BoatType',
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

const BoatSubtype = mongoose.model('BoatSubType', boatSubtypeSchema);

function validateBoatSubType(boatSubType) {
  const schema = {
    role: Joi.string().required()
  };

  return Joi.validate(boatSubType, schema);
}

exports.BoatSubtype = BoatSubtype; 
exports.validate = validateBoatSubType;