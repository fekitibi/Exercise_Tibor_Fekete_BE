const Joi = require('joi');
const mongoose = require('mongoose');

// Since we dont have specific time type a string could be used to store the time
// Where we only need the date part the time could be set to 0 during the creation

const jobSchema = new mongoose.Schema({
    is_emergency:{
        type: Boolean,
        default: false,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    allow_contact_by_app:{
        type: Boolean,
        default: false,
    },
    can_user_bring_boat:{
        type: Boolean,
        default: false,
    },
    allow_picking_from_spot:{
        type: Boolean,
        default: false,
    },
    allow_repair_on_spot:{
        type: Boolean,
        default: false,
    },
    allow_contact_by_phone:{
        type: Boolean,
        default: false,
    },
    allow_contact_by_email:{
        type: Boolean,
        default: false,
    },
    lat:{
        type: Number,
        required: true
    },
    lng:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    posted:{
        type: Boolean,
        default: false,
    },
    due_date:{
        type: Date,
        required: true
      },
    due_time:{
        type: Date,
        required: true
    },
    is_done:{
        type: Boolean,
        default: false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    boat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Boat',
        required: true
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    awarded_company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
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

const Job = mongoose.model('Job', jobSchema);

function validateJob(job) {
  const schema = {
    role: Joi.string().required()
  };

  return Joi.validate(job, schema);
}

exports.Job = Job; 
exports.validate = validateJob;