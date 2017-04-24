import mongoose, {Schema} from 'mongoose';
import User from './user';

var postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
},
{
  timestamps: true
});

export default mongoose.model('Post', postSchema);