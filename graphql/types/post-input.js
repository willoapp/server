import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLDate
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'PostInput',
  fields: {
    _id: { type: GraphQLID },
    userId: { type: GraphQLID },
    content: { type: GraphQLString },
    // state: { type: GraphQLString }
  }
});