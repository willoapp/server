import {GraphQLList, GraphQLString, GraphQLNonNull, GraphQLID} from 'graphql';
import UserType from './types/user';
import User from '../models/user';

// import getProjection from '../../get-projection';

const queries = {
  users: {
    type: new GraphQLList(UserType),
    resolve() {
      return User.find({});
    }
  },
  user: {
    type: UserType,
    args: {
      id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve(root, params, options) {
      return User
        .findById(params.id)
    }
  }
}

export default queries;