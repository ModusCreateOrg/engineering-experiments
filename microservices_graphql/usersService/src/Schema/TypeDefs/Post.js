import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    postDescription: { type: GraphQLString },
    userId: { type: GraphQLID },
  }),
});
