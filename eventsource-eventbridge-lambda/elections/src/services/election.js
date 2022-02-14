const crypto = require('crypto');
const dynamodb = require('../utils/dynamo');
const { sendVoteCastEvent } = require('../utils/events');

const ELECTIONS_TABLE = process.env.TABLE_NAME || 'elections-table';

/**
 * Processes a verified ballot.
 * @param {Object} ballot  A Ballot object.
 */
exports.processBallot = async (ballot = {}) => {
  console.log('ElectionService::processBallot');

  const { ballotId, voter, votes = [] } = ballot;

  // Do verified Ballot processing stuff

  // for each vote, send 'Vote Cast' event
  const eventPromises = votes.map((vote) => {
    return sendVoteCastEvent({
      ballotId,
      voter,
      vote,
    });
  });

  await Promise.all(eventPromises);
};

/**
 * Creates and stores a Vote record.
 * @param {string} ballotId A Ballot identifier.
 * @param {Object} voter A Voter object.
 * @param {string} voter.fullName A Voter full name.
 * @param {Object} vote A Vote object.
 * @param {string} vote.candidateId A Candidate identifier.
 * @param {string} vote.electionId An Election identifier.
 */
exports.saveVote = async (ballotId, voter, vote) => {
  console.log('ElectionService::saveVote');

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
  await dynamodb.put(input);
};

/**
 * Increments the vote count for the Candidate in the Election.
 * @param {string} electionId An Election identifier.
 * @param {string} candidateId A Candidate identifier.
 */
exports.countVote = async (electionId, candidateId) => {
  console.log('ElectionService::countVote');

  const input = {
    TableName: ELECTIONS_TABLE,
    Key: {
      pk: `ELECTION#${electionId}`,
      sk1: `CANDIDATE#${candidateId}`,
    },
    UpdateExpression: 'ADD voteCount :numberOfVotes',
    ExpressionAttributeValues: {
      ':numberOfVotes': 1,
    },
    ReturnValues: 'NONE',
  };
  await dynamodb.update(input);
};
