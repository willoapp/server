import mongoose, {Schema} from 'mongoose';
import Post from './post'
const bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Member', 'Admin'],
    default: 'Member'
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  firstName: String,
  lastName: String,
  birthDate: Date,
  posts: {
    type: [Schema.Types.ObjectId],
    ref: 'Post'
  },
  family: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  }
},
{
  timestamps: true
});

// Fat arrow function causes 'this' to be undefined instead of user model
userSchema.pre('save', function(next) {
  const user = this;
  const SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
}

export default mongoose.model('User', userSchema);