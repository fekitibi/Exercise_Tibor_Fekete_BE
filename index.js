// TODO: change the ids to int type
// Even though I implemented every model, the only required ones for the login 
// is the user and the user role model if I understood everything correctly.
// For the get company proposals we need the proposal model and the conversation model
// TODO: implement validation functions for all of the models
// TODO: use lodash to make the code cleaner

const mongoose = require('mongoose');
const config = require('config');
const users = require('./routes/users');
const auth = require('./routes/auth');
const user_roles = require('./routes/user_roles');
const proposals = require('./routes/proposals');
const express = require('express');
const app = express();

// Check if json web token env variable is set.
if(!config.get('jtwPrivateKey')){
    console.log("FATAL ERROR jwtPrivateKey is not defined");
    process.exit(1);
}

// Init mongooseDb
mongoose.connect('mongodb://localhost/test')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

// Registering the routes
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/user_roles', user_roles);
app.use('/api/proposals', proposals);

// Starting server on PORT env variable or port 3000 if not declared
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));