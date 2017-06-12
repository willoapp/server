import mongoose, {Schema} from 'mongoose';
import Post from './post'

var userSchema = new mongoose.Schema({
  email: { type: String, required: true },
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

export default mongoose.model('User', userSchema);