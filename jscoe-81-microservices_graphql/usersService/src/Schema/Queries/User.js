import { GraphQLList, GraphQLID } from 'graphql';
import { UserType, UserWithPostType } from '../TypeDefs/User.js';
import { UserObj } from '../userObj.js';
import request from 'request';

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  resolve() {
    return UserObj;
  },
};

export const GET_USER_BY_ID = {
  type: UserType,
  args: {
    userID: { type: GraphQLID },
  },
  resolve: async (parent, args) => {
    const { userID } = args;
    return UserObj.find((user) => user.id === userID);
  },
};

function awaitRequest(userID, query, uri) {
  return new Promise(function (resolve, reject) {
    request(
      {
        method: 'POST',
        uri,
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: {
            userID,
          },
        }),
        JSON: true,
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          const postData = JSON.parse(body);
          resolve(postData?.data?.getPostsByUserId ? postData.data.getPostsByUserId : []);
        } else {
          reject(error);
        }
      }
    );
  });
}

const getPostsByUserId = async (userID) => {
  const query = `
  query($userID: ID) {
    getPostsByUserId(userID: $userID) {
      id,
      postDescription,
      userId
    }
  }
`;
  const uri = `http://localhost:3002/graphql`;
  const res = await awaitRequest(userID, query, uri);
  return res;
};

export const GET_USER_WITH_POSTS = {
  type: UserWithPostType,
  args: {
    userID: { type: GraphQLID },
  },
  async resolve(parent, args) {
    const { userID } = args;
    const userObj = UserObj.find((user) => user.id === userID);
    const postData = await getPostsByUserId(userID);
    return { ...userObj, posts: postData };
  },
};
