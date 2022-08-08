
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/app');

chai.use(chaiHttp);

describe('Trasactions', () => {
    
  /*
  * Test the /POST
  */
  describe('/POST transaction', () => {

    it('it should POST a transaction ', (done) => {
    let transaction = {
      accountId: "627d0561159f0319952606609",
      value: 435894.334,
      type: "INCOME"
    }
  chai.request(server)
      .post('/v1/transactions')
      .send(transaction)
      .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Transaction successfully added!');
            res.body.book.should.have.property('id');
            res.body.book.should.have.property('type');
            res.body.book.should.have.property('value');
            res.body.book.should.have.property('accountId');
        done();
      });
});
});
});