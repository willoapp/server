import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql';
import postType from './post';
import PostModel from '../../models/post';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    lastViewedActivityAt: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    posts: {
      type: new GraphQLList(postType),
      resolve(user) {
        return PostModel.find({userId: user._id})
      }
    }
  }
});