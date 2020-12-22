// This file has declaration for the company schema in mongodb and it provides a validation function for the 
// company object

const Joi = require('joi');
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    lat:{
      type: Number,
      required: true
    },
    lng:{
        type: Number,
      required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    logo_image_url: {
        type: String,
    },
    cvr: {
        type: String,
        max: 10,
        required: true
    },
    is_paid: {
        type: Boolean,
        default:false
    },
    is_enabled: {
        type: Boolean,
        default:true
    },
    is_visible: {
        type: Boolean,
        default:true
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

const Company = mongoose.model('Company', companySchema);

function validateCompany(company) {
  const schema = {
    role: Joi.string().min(5).max(255).required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    user_id: Joi.string().required(),
    logo_image_url: Joi.string(),
    cvr: Joi.string().max(10).required(),
    is_paid: Joi.boolean(),
    is_enabled: Joi.boolean(),
    is_visible: Joi.boolean()
  };

  return Joi.validate(company, schema);
}

exports.Company = Company; 
exports.validate = validateCompany;