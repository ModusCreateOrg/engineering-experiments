import { UserType } from '../TypeDefs/User.js';
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const USER_ADDED = {
  type: UserType,
  subscribe: () => pubsub.asyncIterator('USER_ADDED'),
  resolve: (payload) => {
    return payload;
  },
};
