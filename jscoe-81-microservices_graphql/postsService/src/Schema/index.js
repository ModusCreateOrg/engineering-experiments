import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { CREATE_POST } from './Mutations/Post.js';
import { GET_ALL_POSTS, GET_POST_BY_ID, GET_POSTS_BY_USERID } from './Queries/Post.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllPosts: GET_ALL_POSTS,
    getPostByID: GET_POST_BY_ID,
    getPostsByUserId: GET_POSTS_BY_USERID,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: CREATE_POST,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
