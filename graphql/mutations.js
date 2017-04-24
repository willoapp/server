import {
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql';
import UserInputType from './types/user-input';
import UserType from './types/user';
import User from '../models/user';

import PostInputType from './types/post-input';
import PostType from './types/post';
import Post from '../models/post';

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
      const user = new User(params.data);
      const newUser = await user.save();

      if (!newUser) {
        throw new Error("Error adding a new user");
      }
      return true;
    }
  },
  addPost: {
    type: GraphQLBoolean,
    args: {
      data: {
        name: 'data',
        type: new GraphQLNonNull(PostInputType)
      }
    },
    async resolve (root, params, options) {
      const post = new Post(params.data);
      const newPost = await post.save();

      if (!newPost) {
        throw new Error("Error add a new post");
      }
      return true;
    }
  }
}

export default mutations;