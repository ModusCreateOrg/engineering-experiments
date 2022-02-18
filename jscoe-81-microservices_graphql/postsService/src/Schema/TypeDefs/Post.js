import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import { UserType } from './User.js';

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    postDescription: { type: GraphQLString },
    userId: { type: GraphQLID },
  }),
});

export const PostWithUserType = new GraphQLObjectType({
  name: 'PostWithUser',
  fields: () => ({
    id: { type: GraphQLID },
    postDescription: { type: GraphQLString },
    user: { type: UserType },
  }),
});
