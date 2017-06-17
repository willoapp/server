const jwt = require('jsonwebtoken');
const crypto = require('crypto');
import User from '../models/user';


function generateToken(user) {
  return jwt.sign(user, process.env.SECRET, {
    expiresIn: '30d'
  });
}

// Don't return ALL user info, just this stuff
function setUserInfo(request) {
  return {
    _id: request._id,
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    role: request.role
  }
}


//=============================================
// Login Route
//=============================================
function login(req, res, next) {
  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });
}

//=============================================
// Registration Route
//=============================================
function register(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.' });
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({ error: 'You must enter your full name.' });
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) return next(err);

    // If user is not unique, return err
    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' });
    }

    // If email is unique and password was provided, create account
    let user = new User({
      email,
      password,
      firstName,
      lastName
    });

    user.save(function(err, user) {
      if (err) return next(err);

      // Subscribe member to Wix mailing list
      // some wix api call subscribeToNewsLetter(user.email);

      // Respond with JWT if user was created
      let userInfo = setUserInfo(user);
      res.status(201).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      });
    });
  });
}


//=============================================
// Authorization Middleware
//=============================================

// Roll authorization check
function roleAuthorization(role) {
  return function(req, res, next) {
    const user = req.user;

    User.findById(user._id, function (err, foundUser) {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // User is found, check role.
      if (foundUser.role == role) {
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    });
  }
}

const authController = {
  login,
  register,
  roleAuthorization,
  generateToken,
  setUserInfo,
}
export default authController;