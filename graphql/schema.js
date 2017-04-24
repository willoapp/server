import {
  graphql,
  GraphQLList,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql';
import { db } from '../app';
import queries from './queries';
import mutations from './mutations';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations
  })
});