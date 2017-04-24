import {GraphQLList} from 'graphql';
import UserType from './types/user';
import User from '../models/user';

const queries = {
  users: {
    type: new GraphQLList(UserType),
    resolve() {
      return User.find({});
    }
  }
}

export default queries;