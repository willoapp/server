import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    username: { type: GraphQLString }
  }
});