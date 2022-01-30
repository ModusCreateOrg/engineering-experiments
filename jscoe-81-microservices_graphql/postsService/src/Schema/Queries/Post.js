import { PostType, PostWithUserType } from '../TypeDefs/Post.js';
import { GraphQLList, GraphQLID } from 'graphql';
import { PostObj } from '../postObj.js';

export const GET_ALL_POSTS = {
  type: new GraphQLList(PostType),
  resolve() {
    return PostObj;
  },
};

export const GET_POST_BY_ID = {
  type: PostType,
  args: {
    postID: { type: GraphQLID },
  },
  resolve(parent, args) {
    const { postID } = args;
    return PostObj.find((post) => post.id === postID);
  },
};

export const GET_POSTS_BY_USERID = {
  type: new GraphQLList(PostType),
  args: {
    userID: { type: GraphQLID },
  },
  resolve(parent, args) {
    const { userID } = args;
    return PostObj.filter((post) => post.userId === userID);
  },
};

function awaitRequest(userID, query, uri) {
  console.log('===inside awaitRequest---');
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
        //JSON: true,
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          const userData = JSON.parse(body);
          resolve(userData?.data?.getUserById ? userData.data.getUserById : {});
        } else {
          reject(error);
        }
      }
    );
  });
}

const getUserById = async (userID) => {
  const query = `
  query($userID: ID) {
    getUserById(userID: $userID) {
      id,
      name,
      email
    }
  }
`;
  const uri = `http://localhost:3001/graphql`;
  const res = await awaitRequest(userID, query, uri);
  return res;
};

export const GET_POSTS_WITH_USER_DETAILS = {
  type: PostWithUserType,
  args: {
    postID: { type: GraphQLID },
  },
  async resolve(parent, args) {
    const { postID } = args;
    const post = PostObj.find((post) => post.id === postID);
    console.log('====post====', post);
    //const userData = await getUserById(post.userId); //await getAllUsers(); //await getUserById(post.userId);
    //console.log('====userData====', userData);
    return post;
  },
};
