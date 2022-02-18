import request from 'supertest';
import chai from 'chai';
var expect = chai.expect;

const uri = `http://192.168.1.74:8002/graphql`;

describe('getPostsByUserId', function () {
  it('respond with json field for user', function (done) {
    const query = `
      query($userID: ID) {
        getPostsByUserId(userID: $userID) {
          id,
          postDescription,
          userId
        }
      }
    `;

    const postData = {
      query,
      variables: {
        userID: 1,
      },
    };

    request(uri)
      .post('?')
      .send(postData)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        const postUserDetails = res.body.data.getPostsByUserId;
        expect(postUserDetails.length).to.be.equal(2);
        return done();
      });
  });
});
