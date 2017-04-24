import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLDate,
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
    user: {
      type: userType,
      resolve(post) {
        return UserModel.findOne({_id: post.userId})
      }
    }
  }),
});
