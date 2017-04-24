import mongoose from 'mongoose';

var userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
  }
});

export default mongoose.model('User', userSchema);