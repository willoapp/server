import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql';
import postType from './post';
import PostModel from '../../models/post';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    posts: {
      type: new GraphQLList(postType),
      resolve(user) {
        return PostModel.find({userId: user._id})
      }
    }
  }
});

export default userType;