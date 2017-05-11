import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLOutputType
} from 'graphql';
import userType from './user';
import UserModel from '../../models/user';

export default new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: GraphQLID },
    content: { type: GraphQLString },
    state: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    user: {
      type: userType,
      resolve(post) {
        return UserModel.findOne({_id: post.userId})
      }
    }
  }),
});
