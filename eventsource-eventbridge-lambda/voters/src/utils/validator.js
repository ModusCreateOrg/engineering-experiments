exports.isValidBallot = ({ ballotId, voterId, votes }) => {
  const hasBallotId = !!ballotId && typeof ballotId === 'string';
  const hasVoterId = !!voterId && typeof voterId === 'string';
  const hasVotes =
    !!votes &&
    Array.isArray(votes) &&
    votes.length > 0 &&
    votes.map((vote) => this.isValidVote(vote)).reduce((previous, current) => previous && current, true);

  return hasBallotId && hasVoterId && hasVotes;
};

exports.isValidVote = (vote = {}) => {
  const { electionId, candidateId } = vote;

  const hasElectionId = !!electionId && typeof electionId === 'string';
  const hasCandidateId = !!candidateId && typeof candidateId === 'string';

  return hasElectionId && hasCandidateId;
};
