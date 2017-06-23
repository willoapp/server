import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLOutputType
} from 'graphql';

import {
  GraphQLDateTime,
} from 'graphql-iso-date';

import userType from './user';
import UserModel from '../../models/user';

export default new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: GraphQLID },
    content: { type: GraphQLString },
    state: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
    user: {
      type: userType,
      resolve(post) {
        return UserModel.findOne({_id: post.userId})
      }
    }
  }),
});
