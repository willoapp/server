import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLDate,
  GraphQLOutputType
} from 'graphql';
import {UserType} from './user';
import User from '../../models/user';

export default new GraphQLObjectType({
  name: 'Post',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: GraphQLID },
    content: { type: GraphQLString },
    // user: { type: UserType }
  }
});
