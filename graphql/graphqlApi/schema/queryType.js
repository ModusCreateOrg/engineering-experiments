const {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLBoolean,
  } = require("graphql");
  
  const NinjaType = require('./types/Ninja');
  const Galaxy = require('./types/Galaxy');
  const getGalaxiesAndStars = require("../galaxiesStars");
  const { setAndSendNinjas } = require('../ninjaClan');

 

  
  const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    description: "This holds all the query APIs",
    fields: {
      // async  vs sync call comparison
      ninjas: {
          type: new GraphQLList(NinjaType),
          description: "This is to get ninjas",
          args: {
            limit:{
                type : GraphQLInt,
            },
            async: {
                type: GraphQLBoolean
            }
          },
          resolve: async(obj, args, context) => {
            const { limit, async } = args;
            return setAndSendNinjas(async, limit);
          }
      },
      // huge volume of response
      galaxystars: {
        type: new GraphQLList(Galaxy),
        description: 'List of galaxies with start details',
        resolve: async(obj, args, context) => {
          const { pgPool } = context;
          return await getGalaxiesAndStars(pgPool);
        }
      }
    },
  });
  
  module.exports = RootQueryType;

