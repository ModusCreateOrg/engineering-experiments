const { processBallot } = require('../services/ballot');

exports.handle = async (event, context) => {
  console.log(`Handler::ballotSubmitted`);
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

const isValidRequest = (event = {}) => {
  const { detail = {} } = event;
  const { ballotId, voterId, votes } = detail;

  const hasBallotId = !!ballotId && typeof ballotId === 'string';
  const hasVoterId = !!voterId && typeof voterId === 'string';
  const hasVotes = !!votes && Array.isArray(votes) && votes.length > 0;

  return hasBallotId && hasVoterId && hasVotes;
};
