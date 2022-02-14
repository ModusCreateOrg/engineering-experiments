const ElectionService = require('../services/election');

/**
 * Save vote function request handler. EventBridge event handler.
 * @param {Object} event The Lambda request event.
 * @param {Object} event.detail The EventBridge `detail`.
 * @param {Object} context The Lambda request context.
 * @returns A Lambda response object.
 */
exports.handle = async (event, context) => {
  console.log(`Handler::saveVote`);
  console.log(`event:\n${JSON.stringify(event, null, 2)}`);

  if (isValidRequest(event)) {
    const { detail = {} } = event;
    const { ballotId, voter, vote } = detail;

    await ElectionService.saveVote(ballotId, voter, vote);

    return {
      status: 200,
      statusText: 'OK',
    };
  } else {
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
  const { ballotId, voter = {}, vote = {} } = detail;

  const hasBallotId = !!ballotId && typeof ballotId === 'string';
  const hasVoterId = !!voter.voterId && typeof voter.voterId === 'string';
  const hasElectionId = !!vote.electionId && typeof vote.electionId === 'string';
  const hasCandidateId = !!vote.candidateId && typeof vote.candidateId === 'string';

  return hasBallotId && hasVoterId && hasElectionId && hasCandidateId;
};
