const AuditService = require('../services/audit');

/**
 * Create audit event record function request handler. EventBridge event handler.
 * @param {Object} event The Lambda request event.
 * @param {*} context The Lambda request context.
 * @returns A Lambda response object.
 */
exports.handle = async (event, context) => {
  console.log(`Handler::auditEvent`);
  console.log(`event:\n${JSON.stringify(event, null, 2)}`);

  if (isValidRequest(event)) {
    const { detail = {} } = event;
    const type = event['detail-type'];

    await AuditService.createRecord(type, detail);

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
  const { detail } = event;
  const type = event['detail-type'];

  const hasType = !!type && typeof type === 'string';
  const hasDetail = !!detail && typeof detail === 'object';

  return hasType && hasDetail;
};
