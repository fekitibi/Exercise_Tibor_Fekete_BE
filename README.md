# Exercise_Tibor_Fekete_BE

For this exercise I used the express framework with mongoDb. To access and modify the database I used the mongoose library. For security reasons password hashing and json web token libraries were added to the project. The config library was used to look up the json web token secret in the environment variable. Joi was used to validate the incoming data, but since endpoints have not been created for every model, not every model has a fully implemented validation method.

To run the project:
- Run the mongoDb on the localhost:27017
- Open a CMD or Terminal and go to the project folder
- Install all of the packages
```
npm install
```
- set the auth_jwtPrivateKey environment viable on the machine
  - on windows in the cmd:
  ```
  set NEWVAR=SOMETHING
  ```
  - on mac in the terminal:
  ```
  export NEWVAR=SOMETHING
  ```
- Run the database seeder script:
```
node seedDb.js
```
- Run the server:
```
node index.js
```

The server will listen to port 3000 on the localhost if the PORT environment variable is not set.
The server has the following endpoints:
- Auth is for authenticating already registered users
  - /api/auth
  - this endpoint is looking for a valid email address and a password in the body
  ```
  {
    "email":"email@email.emailr",
    "password":"12345"
  }
  ```
  - If the validation is successful it returns an access token
- User is for user registration
  - /api/user
   - this endpoint is looking for a valid name, email address, password, phone number(optional), address, zip code, and city in the body
  ```
  {
    "name":"name",
    "email":"email@email.email",
    "password":"12345",
    "phone_number": "1234567",
    "address": "valid addr",
    "zip_code": "zip code",
    "city": "city name"
  }
  ```
  - If the validation is successful it returns the user-id, name, and email address
- User role endpoint is for admins to add new user roles
  - /api/user_roles
  - this endpoint is expecting a valid unique role name
  ```
  {
    "role":"newrole"
  }
  ```
  - If the request is successful it returns the role-id and name
- The proposals endpoint returns all the available proposals for the user
  - Check the implementation and my comments on it in the proposals.js
  - To successfully retrieve proposals a x-auth-token header must be supplied with a valid token
  - /api/proposals
  
For further information read the comments in the project files.
