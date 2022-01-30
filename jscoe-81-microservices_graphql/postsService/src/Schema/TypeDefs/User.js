import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});
