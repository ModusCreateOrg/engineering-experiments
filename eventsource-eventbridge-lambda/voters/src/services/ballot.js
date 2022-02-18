const { isValidBallot } = require('../utils/validator');
const { find: findVoter } = require('./voter');
const { sendBallotRejectedEvent, sendBallotVerifiedEvent } = require('../utils/events');
const dynamodb = require('../utils/dynamo');

const VOTERS_TABLE = process.env.TABLE_NAME || 'voters-table';

/**
 * Enumerates all possible ballot state values. See `Ballot.ballotState`
 */
exports.BallotState = {
  Issued: 'ISSUED',
  Submitted: 'SUBMITTED',
};

/**
 * Update a Ballot's `ballotState` property.
 * @param {string} voterId A Voter identifier.
 * @param {string} ballotId A Ballot identifier.
 * @param {string} ballotState A ballot state value, e.g. 'ISSUED' or 'SUBMITTED'. default=ISSUED
 */
exports.updateState = async (voterId, ballotId, ballotState = this.BallotState.Issued) => {
  console.log('BallotService::updateState');

  const input = {
    TableName: VOTERS_TABLE,
    Key: {
      pk: `VOTER#${voterId}`,
      sk1: `BALLOT#${ballotId}`,
    },
    UpdateExpression: 'SET ballotState = :ballotState, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':ballotState': ballotState,
      ':updatedAt': new Date().toISOString(),
    },
    ReturnValues: 'NONE',
  };
  await dynamodb.update(input);
};

/**
 * Process a submitted Ballot.
 * @param {Object} ballot A `Ballot` object.
 */
exports.processBallot = async (ballot = {}) => {
  console.log(`BallotService::processBallot`);

  if (isValidBallot(ballot)) {
    const { ballotId, voterId, votes = [] } = ballot;

    // Do Ballot processing stuff, e.g. find Voter & validate Voter was issued this Ballot
    const [voter, ballots] = await findVoter(voterId);
    console.log(`voter:${JSON.stringify(voter, null, 2)}`);
    console.log(`ballots:${JSON.stringify(ballots, null, 2)}`);

    const ballotItem = ballots.find((aBallot) => aBallot.ballotId === ballotId);
    console.log(`ballotItem:${JSON.stringify(ballotItem, null, 2)}`);
    if (ballotItem) {
      if (ballotItem.ballotState === this.BallotState.Issued) {
        // update ballot state
        await this.updateState(voterId, ballotId, this.BallotState.Submitted);

        // send 'Ballot Verified' event
        await sendBallotVerifiedEvent({
          ...ballotItem,
          voter,
          votes,
        });
        return;
      }
    }
  }

  // otherwise, send 'Ballot Rejected' event
  await sendBallotRejectedEvent(ballot);
};
