// This middleware is responsible to check if the user has Admin privilages

const {UserRole} = require('../models/user_role');

async function admin_auth(req, res, next){

    let userRole = await UserRole.findById(req.user.user_role_id);
    if(userRole.role != 'Admin') return res.status(403).send('Access denied.');
    next();
}

module.exports = admin_auth;