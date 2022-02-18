const axios = require('axios');

const baseUrl = process.env.API_BASEURL || 'http://localhost';

/**
 * Sends a HTTP(S) request.
 * @param {Object} config An axios request config object.
 * @param {number} attempts Number of attempts to send. default=3
 * @returns An object containing the response payload.
 */
const send = async (config, attempts = 3) => {
  while (attempts > 0) {
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      attempts--;
      console.log(`Problem sending event. ${attempts} attempts remaining. Detail: ${JSON.stringify(config)}`, error);
    }
  }

  // unable to successfully transmit event
  throw new Error('Failed to send event.');
};

/**
 * Send a 'Vote Cast' event.
 * @param {Object} detail An object containing the event detail (i.e. payload).
 * @returns An object containing the event confirmation.
 * @throws An Error if all attempts to send the event fail.
 */
exports.sendVoteCastEvent = async (detail = {}) => {
  console.log('Events::sendVoteCastEvent');

  const config = {
    url: `${baseUrl}/events`,
    method: 'post',
    data: {
      type: 'Vote Cast',
      detail,
    },
  };

  return await send(config);
};
