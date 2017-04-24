import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'user',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    email: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    }
  }
});