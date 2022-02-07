const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('./config.json');

function awaitRequest(queryVariable, query, uri) {
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
          variables: queryVariable,
        }),
        JSON: true,
      },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          const resData = JSON.parse(body);
          resolve(resData);
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
  const uri = config.usersService.url;

  const res = await awaitRequest({ userID }, query, uri);
  return res?.data?.getUserById ? res.data.getUserById : null;
};

const getPostById = async (postID) => {
  const query = `
  query($postID: ID) {
    getPostByID(postID: $postID) {
      id,
      userId,
      postDescription
    }
  }
`;
  const uri = config.postsService.url;

  const res = await awaitRequest({ postID }, query, uri);
  return res?.data?.getPostByID ? res.data.getPostByID : null;
};

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
  const uri = config.postsService.url;

  const res = await awaitRequest({ userID }, query, uri);
  return res?.data?.getPostsByUserId ? res.data.getPostsByUserId : null;
};

router.all('/users/:id', async (req, res) => {
  const userData = await getUserById(req.params.id);
  res.send(userData);
});

router.all('/posts/:id', async (req, res) => {
  const postData = await getPostById(req.params.id);
  res.send(postData);
});

router.all('/user/:id/posts', async (req, res) => {
  const userData = await getUserById(req.params.id);

  const postData = await getPostsByUserId(req.params.id);

  res.send({ ...userData, posts: postData });
});

module.exports = router;
