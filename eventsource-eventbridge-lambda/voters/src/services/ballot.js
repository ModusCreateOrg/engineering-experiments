const { isValidBallot } = require('../utils/validator');
const { find: findVoter } = require('./voter');
const { sendBallotRejectedEvent, sendBallotVerifiedEvent } = require('../utils/events');

/**
 * Process a submitted Ballot.
 * @param {Object} ballot A `Ballot` object.
 */
exports.processBallot = async (ballot = {}) => {
  console.log(`BallotService::processBallot`);

  if (isValidBallot(ballot)) {
    const { ballotId, voterId, votes = [] } = ballot;

    // DO Ballot processing stuff, e.g. find Voter & validate Voter was issued this Ballot

    // send 'Ballot Verified' event
    await sendBallotVerifiedEvent(ballot);
  } else {
    // send 'Ballot Rejected' event
    await sendBallotRejectedEvent(ballot);
  }
};
