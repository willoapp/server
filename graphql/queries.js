import {GraphQLList, GraphQLString, GraphQLNonNull, GraphQLID} from 'graphql';
import userType from './types/user';
import UserModel from '../models/user';

import postType from './types/post';
import PostModel from '../models/post';

const queries = {
  users: {
    type: new GraphQLList(userType),
    resolve() {
      return UserModel.find({});
    }
  },
  user: {
    type: userType,
    args: {
      id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve(root, params, options) {
      return UserModel.findById(params.id)
    }
  },
  posts: {
    type: new GraphQLList(postType),
    resolve(root, params, options) {
      return PostModel.find({});
    }
  }
}

export default queries;