const app = require("express")();
const pg = require("pg");
const { MongoClient } = require("mongodb");
const Schema = require("./schema");
const { graphqlHTTP } = require("express-graphql");
const { assertAbstractType } = require("graphql");
const PORT = process.env.PORT || 3000;

const pgPool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "graphql_rest_modus",
  password: "password",
});

MongoClient.connect(
  "mongodb://localhost:27017/graphql_rest_modus_m",
  (err, mongoClient) => {
    if(err){
      console.error(err);
      return 
    }
    app.use(
      "/graphql",
      graphqlHTTP({
        schema: Schema,
        graphiql: true,
        context: {
          pgPool: pgPool,
          mongo: mongoClient.db("graphql_rest_modus_m"),
        },
      })
    );
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  }
);