const { GraphQLSchema } = require('graphql');
const QueryType = require('./queryType');
const MutationType= require('./mutationType');

module.exports = new GraphQLSchema({
 query: QueryType,
 mutation: MutationType
});