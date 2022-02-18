import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { schema } from './Schema/index.js';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

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

  const server = createServer(app);

  server.listen(3003, () => {
    new SubscriptionServer(
      {
        schema,
        execute,
        subscribe,
        onConnect: () => console.log('client connected'),
      },
      {
        server,
        path: '/subscriptions',
      }
    );

    console.log('User Service is running on port 3003');
  });
};

main().catch((err) => {
  console.log(err);
});
