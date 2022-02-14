const { sendVoteCastEvent } = require('../utils/events');

/**
 * Process a verified ballot.
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
