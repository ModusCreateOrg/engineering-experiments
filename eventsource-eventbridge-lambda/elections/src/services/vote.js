const crypto = require('crypto');
const dynamodb = require('../utils/dynamo');

const ELECTIONS_TABLE = process.env.TABLE_NAME || 'elections-table';

exports.create = async (ballotId, voter, vote) => {
  console.log('VoteService::create');

  const { candidateId, electionId } = vote;
  const voteId = crypto.randomBytes(3).toString('hex');

  const input = {
    TableName: ELECTIONS_TABLE,
    Item: {
      pk: `VOTE#${voteId}`,
      sk1: `ELECTION#${electionId}`,
      voteId,
      ballotId,
      voterId: voter.voterId,
      electionId,
      candidateId,
      voterName: voter.fullName,
      createdAt: new Date().toISOString(),
    },
  };
  const output = await dynamodb.put(input);
};
