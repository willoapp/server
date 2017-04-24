import mongoose from 'mongoose';

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
  }
});

export default mongoose.model('User', userSchema);