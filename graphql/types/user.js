import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql';
import {PostType} from './post';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
  }
});