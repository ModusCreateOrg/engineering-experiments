const ElectionService = require('../services/election');

/**
 * Count vote function request handler. EventBridge event handler.
 * @param {Object} event The Lambda request event.
 * @param {Object} event.detail The EventBridge `detail`.
 * @param {Object} context TheLambda request context.
 * @returns A Lambda response object.
 */
exports.handle = async (event, context) => {
  console.log(`Handler::countVote`);
  console.log(`event:\n${JSON.stringify(event, null, 2)}`);

  if (isValidRequest(event)) {
    const { detail = {} } = event;
    const { vote } = detail;

    await ElectionService.countVote(vote.electionId, vote.candidateId);

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
  const { vote = {} } = detail;

  const hasElectionId = !!vote.electionId && typeof vote.electionId === 'string';
  const hasCandidateId = !!vote.candidateId && typeof vote.candidateId === 'string';

  return hasElectionId && hasCandidateId;
};
