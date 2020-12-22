const Joi = require('joi');
const mongoose = require('mongoose');

// Since we dont have specific time type a string could be used to store the time
// On the date part the time could be set to 0 during the creation

const proposalSchema = new mongoose.Schema({
    date:{
        type: Date,
        required: true
    },
    time:{
        type: Date,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    negotiable:{
        type: Boolean,
        default: false
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'canceled'],
        required: true,
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
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

const Proposal = mongoose.model('Proposal', proposalSchema);

function validateProposal(proposal) {
  const schema = {
    role: Joi.string().required()
  };

  return Joi.validate(engine, schema);
}

exports.Proposal = Proposal; 
exports.validate = validateProposal;