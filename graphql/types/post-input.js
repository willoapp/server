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
    userId: { type: GraphQLID },
    content: { type: GraphQLString },
    // _id: { type: GraphQLID },
    // state: { type: GraphQLString }
  }
});