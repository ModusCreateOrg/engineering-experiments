const { GraphQLString, GraphQLInt, GraphQLObjectType } = require("graphql");
const Clan = require('./Clan');

const Ninja = new GraphQLObjectType({
  name: "Ninja",
  description: "Ninja object type",
  fields: {
    title: {
      type: GraphQLString,
      resolve: (obj) => obj.title,
    },
    clan: {
      type: Clan,
      resolve: (obj) => {
          return obj.clan;}
    },
  },
});

module.exports = Ninja;