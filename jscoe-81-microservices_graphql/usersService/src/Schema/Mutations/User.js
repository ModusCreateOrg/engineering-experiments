import { GraphQLString } from 'graphql';
import { UserType } from '../TypeDefs/User.js';
import { UserObj } from '../userObj.js';
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  resolve(parent, args) {
    const { name, email } = args;
    const newUser = {
      id: '4',
      name,
      email,
    };
    UserObj.push(newUser);

    const payload = {
      userAdded: newUser,
    };
    pubsub.publish('USER_ADDED', payload);

    return args;
  },
};
