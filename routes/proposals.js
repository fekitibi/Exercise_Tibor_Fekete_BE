const mongoose = require('mongoose');
const {Job} = require('../models/job');
const {Proposal} = require('../models/proposal');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    // this only returns the first job
    // This can be replaced with find to get back all the jobs
    // For this demo since I only have one job in the db I use find one 
    // In normal scenario all jobs could be retrieved by a user and the server could send a json file something like this {job1[proposal1,prop2], job2[]..}
    //(this job array could be an object as well)
    const job = await Job.findOne({user_id: req.user._id});

    if(!job) return res.status(404).send('User does not have any posted job.');

    const proposals = await Proposal.find({job_id: job._id});
    if(!proposals) return res.status(404).send('There are no proposals yet.');

    res.send(proposals);
});

module.exports = router;