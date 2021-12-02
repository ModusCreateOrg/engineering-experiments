const { GraphQLString, GraphQLObjectType } = require("graphql");

const Clan = new GraphQLObjectType({
  name: "Clan",
  description: "Clan object type",
  fields: {
    name: {
      type: GraphQLString,
      resolve: (obj) => obj.name,
    },
  },
});

module.exports = Clan;