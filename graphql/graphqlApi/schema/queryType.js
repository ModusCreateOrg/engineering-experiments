const {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLBoolean,
  } = require("graphql");
  
  const NinjaType = require('./types/Ninja');

  class Clan {
    constructor(name) {
      this.name = name;
    }
  }
  
  const clan = new Clan('Iga');
  
  class Ninja {
    constructor(title) {
      this.title = title;
    }
  
    clanSync() {
        this.clan = clan;
    }

    clanAsync() {
         this.clan = Promise.resolve(clan);
    }
  }

  
  const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    description: "This holds all the query APIs",
    fields: {
      ninjas: {
          type: new GraphQLList(NinjaType),
          description: "This is to get books",
          args: {
            limit:{
                type : GraphQLInt,
            },
            async: {
                type: GraphQLBoolean
            }
          },
          resolve: async(obj, args, context) => {
            const {limit, async} = args;

            const ninjas = [];
            if(async) {
                for (let i = 0; i < limit; i++) {
                    const ninjaItem = new Ninja('Ninja:' + i);
                    ninjaItem.clanAsync();
                    ninjas.push(ninjaItem);
                }
            } else {
                for (let i = 0; i < limit; i++) {
                    const ninjaItem = new Ninja('Ninja:' + i);
                    ninjaItem.clanSync();
                    ninjas.push(ninjaItem);
                }
            }
            
            return Promise.resolve(ninjas);

          }
      }
    },
  });
  
  module.exports = RootQueryType;