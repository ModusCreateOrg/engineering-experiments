const dynamodb = require('../utils/dynamo');

const AUDIT_TABLE = process.env.TABLE_NAME || 'audit-table';

const createVoterRecord = async (type, voterId, detail = {}) => {
  // PERSIST VOTER AUDIT RECORD
};

const createElectionRecord = async (type, electionId, detail = {}) => {
  // PERSIST ELECTION AUDIT RECORD
};

const createCandidateRecord = async (type, candidateId, detail = {}) => {
  // PERSIST CANDIDATE AUDIT RECORD
};

/**
 * Create and perist an audit record for Ballot events.
 * @param {string} type An event type.
 * @param {*} ballotId A Ballot identifier.
 * @param {*} detail A Ballot event detail object, i.e. the event payload.
 */
const createBallotRecord = async (type, ballotId, detail) => {
  console.log('AuditService::createBallotRecord');

  const createdAt = new Date().toISOString();

  const input = {
    TableName: AUDIT_TABLE,
    Item: {
      pk: `BALLOT#${ballotId}`,
      createdAt,
      eventType: type,
      eventDetail: detail,
    },
  };
  await dynamodb.put(input);
};

/**
 * Create and persist an audit record.
 * @param {string} type An event type. e.g. 'Vote Cast' or 'Ballot Submitted'
 * @param {Object} detail An event detail object, i.e. the event payload.
 */
exports.createRecord = async (type, detail) => {
  console.log('AuditService::createRecord');

  switch (type) {
    case 'Ballot Submitted':
      await createBallotRecord(type, detail.ballotId, detail);
      break;
    case 'Ballot Verified':
      await createBallotRecord(type, detail.ballotId, detail);
      break;
    case 'Ballot Rejected':
      await createBallotRecord(type, detail.ballotId, detail);
      break;
    case 'Vote Cast':
      await createBallotRecord(type, detail.ballotId, detail);
      break;
    default:
      console.log(`ERROR::Audit error. Unknown event type: ${type}`);
      throw new Error('Audit error. Unknown event type ${type}.');
  }
};
