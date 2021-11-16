const { GraphQLString, GraphQLInt, GraphQLObjectType, GraphQLList, GraphQLFloat } = require("graphql");

const Star = new GraphQLObjectType({
  name: "Star",
  description: "Star object type",
  fields: {
    id: {
      type: GraphQLInt,
      resolve: (obj) => obj.id,
    },
    name: {
      type: GraphQLString,
      resolve: (obj) => {
          return obj.name;
        }
    },
    star_type: {
        type: GraphQLString,
        resolve: (obj) => {
            return obj.star_type;
        }
    },
    group: {
        type: GraphQLString,
        resolve: (obj) => {
            return obj.group;
        }

    },
    brightness: {
        type: GraphQLString,
        resolve: (obj) => {
            return obj.brightness;
        }
    },
    mass: {
        type: GraphQLFloat,
        resolve: (obj) => {
            return obj.mass;
        }
    }
  },
});

module.exports = Star;