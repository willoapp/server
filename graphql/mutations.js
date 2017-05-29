import {
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql';

import userInputType from './types/user-input';
import userType from './types/user';
import UserModel from '../models/user';

import postInputType from './types/post-input';
import postType from './types/post';
import PostModel from '../models/post';

const mutations = {
  addUser: {
    type: userType,
    args: {
      data: {
        name: 'data',
        type: new GraphQLNonNull(userInputType)
      }
    },
    async resolve (root, params, options) {
      const user = new UserModel(params.data);
      const newUser = await user.save();

      if (!newUser) {
        throw new Error("Error adding a new user");
      }
      return newUser;
    }
  },
  addPost: {
    type: postType,
    args: {
      post: {
        name: 'post',
        type: new GraphQLNonNull(postInputType)
      }
    },
    async resolve (root, params, options) {
      const post = new PostModel({
        userId: params.post.userId,
        content: params.post.content
      });
      const newPost = await post.save();

      if (!newPost) {
        throw new Error("Error add a new post");
      }
      return newPost;
    }
  }
}

export default mutations;