import { PostType } from '../TypeDefs/Post.js';
import { GraphQLString, GraphQLID } from 'graphql';
import { PostObj } from '../postObj.js';

export const CREATE_POST = {
  type: PostType,
  args: {
    postDescription: { type: GraphQLString },
    userId: { type: GraphQLID },
  },
  resolve(parent, args) {
    const { postDescription, userId } = args;
    PostObj.push({
      id: '77',
      postDescription,
      userId,
    });
    return args;
  },
};
