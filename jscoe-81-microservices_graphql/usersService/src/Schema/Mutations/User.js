import { GraphQLString } from 'graphql';
import { UserType } from '../TypeDefs/User.js';
import { UserObj } from '../userObj.js';

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  resolve(parent, args) {
    const { name, email } = args;
    UserObj.push({
      id: '4',
      name,
      email,
    });
    return args;
  },
};
