const _ = require('lodash');
const bcrypt = require('bcrypt');
const {UserRole, validate} = require('../models/user_role');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin_auth = require('../middleware/amin_auth');
const express = require('express');
const router = express.Router();

// This endpoint is for admins to create new user roles
// Here user role update and delete user role endpoints could be potentially implemented with the correct authorization
router.post('/', [auth, admin_auth], async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let userRole = await UserRole.findOne({role:req.body.role});
    if(userRole) return res.status(400).send('User role already registered.');

    let userRoleData = _.pick(req.body, ['role']);
    
    userRoleData.created_at = Date.now();
    userRoleData.updated_at = Date.now();

    userRole = new UserRole(userRoleData);

    await userRole.save();
    
    res.send(_.pick(userRole,['_id', 'role']));
});

module.exports = router;