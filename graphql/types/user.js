import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql';
import {
  GraphQLDateTime,
} from 'graphql-iso-date';

import postType from './post';
import PostModel from '../../models/post';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
    posts: {
      type: new GraphQLList(postType),
      resolve(user) {
        return PostModel.find({userId: user._id})
      }
    }
  }
});