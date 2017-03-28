import {
  graphql,
  GraphQLList,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql';
import { db } from '../app';

var UserType = new GraphQLObjectType({
  name: 'user',
  fields: {
    _id: {
      type: GraphQLID,
    },
    email: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    }
  }
})


export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: {
        type: new GraphQLList(UserType),
        resolve() {
          return db.get('users').find({});
        }
      }
    }
  })
});