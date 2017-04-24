import mongoose, {Schema} from 'mongoose';

var postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
},
{
  timestamps: true
});

export default mongoose.model('Post', postSchema);