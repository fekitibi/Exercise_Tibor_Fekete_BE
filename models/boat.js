const Joi = require('joi');
const mongoose = require('mongoose');

const boatSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    year:{
        type: Number,
        required: true,
    },
    boat_subtype_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BoatSubType',
      required: true
    },
    engine_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Engine',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    engine_serial_number:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    length:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    zip_code:{
        type: String,
        required: true,
    },
    city:{
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

const Boat = mongoose.model('Boat', boatSchema);

function validateBoat(boat) {
  const schema = {
    role: Joi.string().required()
  };

  return Joi.validate(boat, schema);
}

exports.Boat = Boat; 
exports.validate = validateBoat;