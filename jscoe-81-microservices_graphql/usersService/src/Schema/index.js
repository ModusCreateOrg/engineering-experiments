import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { GET_ALL_USERS, GET_USER_BY_ID, GET_USER_WITH_POSTS, GET_ALL_USERS_WITH_POSTS } from './Queries/User.js';
import { CREATE_USER } from './Mutations/User.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllUsers: GET_ALL_USERS,
    getUserById: GET_USER_BY_ID,
    getUserWithPosts: GET_USER_WITH_POSTS,
    getAllUsersWithPosts: GET_ALL_USERS_WITH_POSTS,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: CREATE_USER,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
