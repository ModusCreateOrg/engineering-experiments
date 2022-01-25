import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { schema } from './Schema/index.js';

const main = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  //for graphql we generally have only one endpoint
  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(3002, () => {
    console.log('Posts Service is running on port 3002');
  });
};

main().catch((err) => {
  console.log(err);
});
