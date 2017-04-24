import {
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql';
import UserInputType from './types/user-input';
import UserType from './types/user';
import User from '../models/user';

const mutations = {
  addUser: {
    type: GraphQLBoolean,
    args: {
      data: {
        name: 'data',
        type: new GraphQLNonNull(UserInputType)
      }
    },
    async resolve (root, params, options) {
      console.log('params: ', params);
      const user = new User(params.data);
      const newUser = user.save();

      if (!newUser) {
        throw new Error("Error adding a new user");
      }
      return true;
    }
  }
}

export default mutations;