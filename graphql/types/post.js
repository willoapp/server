import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLDate,
  GraphQLOutputType
} from 'graphql';
import userType from './user';

export default new GraphQLObjectType({
  name: 'Post',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: GraphQLID },
    content: { type: GraphQLString },
  },
});
