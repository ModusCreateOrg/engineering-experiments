const { processBallot } = require('../services/election');

/**
 * Ballot verified function request handler. The entry point for ballot verified events.
 * @param {Object} event The Lambda request event.
 * @param {Object} event.detail The EventBridge `detail`. A Ballot object.
 * @param {Object} context TheLambda request context.
 * @returns A Lambda response object.
 */
exports.handle = async (event, context) => {
  console.log(`Handler::ballotVerified`);
  console.log(`event:\n${JSON.stringify(event, null, 2)}`);

  if (isValidRequest(event)) {
    const { detail = {} } = event;
    await processBallot(detail);

    return {
      status: 200,
      statusText: 'OK',
    };
  } else {
    console.log(`ERROR::Bad Request::${JSON.stringify(event)}`);
    return {
      status: 400,
      statusText: 'Bad Request',
    };
  }
};

/**
 * Validate the request.
 * @param {Object} event The Lambda request event.
 * @returns A boolean whose value is `true` if the request is valid, otherwise `false`.
 */
const isValidRequest = (event = {}) => {
  const { detail = {} } = event;
  const { ballotId, voterId, votes } = detail;

  const hasBallotId = !!ballotId && typeof ballotId === 'string';
  const hasVoterId = !!voterId && typeof voterId === 'string';
  const hasVotes = !!votes && Array.isArray(votes) && votes.length > 0;

  return hasBallotId && hasVoterId && hasVotes;
};
