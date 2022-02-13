const dynamodb = require('../utils/dynamo');

const VOTERS_TABLE = process.env.TABLE_NAME || 'voters-table';

/**
 * Find Voter by primary key.
 * @param {string} voterId A Voter identifier.
 * @returns A tuple in the shape [voter={}|`null`, ballots=[]]
 */
exports.find = async (voterId) => {
  console.log('VoterService::find');

  const input = {
    TableName: VOTERS_TABLE,
    KeyConditionExpression: 'pk = :pkval',
    ExpressionAttributeValues: {
      ':pkval': `VOTER#${voterId}`,
    },
  };
  const output = await dynamodb.query(input);

  const voter = output.Items.find((item) => item.sk1 === 'PROFILE');
  const ballots = output.Items.filter((item) => item.sk1.startsWith('BALLOT'));

  return [voter, ballots];
};
