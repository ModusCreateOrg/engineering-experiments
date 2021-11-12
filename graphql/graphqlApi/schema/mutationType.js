const { GraphQLObjectType, GraphQLString } = require("graphql");

const Ninja = require('./types/Ninja');


const RootMutationType = new GraphQLObjectType({
  name: "RootMutationType",
  description: "this holds all the mutation APIs",
  fields: {
    user: {
      type: Ninja,
      args: { input: { type: GraphQLString } },
      description: "Handler for create user",
      resolve: async (obj, { input }, context) => {
        const { pgPool, mongo } = context;
        const {
          rows: [user],
        } = await pgPool.query(
          `insert into users(first_name) values($1) returning *;`,
          [input]
        );
        await mongo
          .collection("metrics")
          .updateOne(
            { key: "userCount" },
            { $inc: { value: 1 } },
            { upsert: 1 }
          );
        return user;
      },
    },
  },
});

module.exports = RootMutationType;