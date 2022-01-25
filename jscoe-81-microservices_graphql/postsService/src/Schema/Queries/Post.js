import { PostType } from '../TypeDefs/Post.js';
import { GraphQLList, GraphQLID } from 'graphql';
import { PostObj } from '../postObj.js';

export const GET_ALL_POSTS = {
  type: new GraphQLList(PostType),
  resolve() {
    return PostObj;
  },
};

export const GET_POST_BY_ID = {
  type: PostType,
  args: {
    postID: { type: GraphQLID },
  },
  resolve(parent, args) {
    const { postID } = args;
    return PostObj.find((post) => post.id === postID);
  },
};

export const GET_POSTS_BY_USERID = {
  type: new GraphQLList(PostType),
  args: {
    userID: { type: GraphQLID },
  },
  resolve(parent, args) {
    const { userID } = args;
    return PostObj.filter((post) => post.userId === userID);
  },
};
