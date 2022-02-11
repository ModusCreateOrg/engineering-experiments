const axios = require('axios');

const baseUrl = process.env.API_BASEURL || 'http://localhost';

exports.requestTransfer = async (payload = {}) => {
  // produces 'Transfer Requested' event
  const response = await axios.request({
    url: `${baseUrl}/events`,
    method: 'post',
    data: {
      type: 'Transfer Requested',
      detail: payload,
    },
  });
  return response.data;
};

exports.addToWaitList = async (payload = {}) => {
  // produces 'Add to Wait List' event
  const response = await axios.request({
    url: `${baseUrl}/events`,
    method: 'post',
    data: {
      type: 'Add to Wait List',
      detail: payload,
    },
  });
  return response.data;
};

exports.readyForPickup = async (payload = {}) => {
  // produces 'Ready for Pickup' event
  const response = await axios.request({
    url: `${baseUrl}/events`,
    method: 'post',
    data: {
      type: 'Ready for Pickup',
      detail: payload,
    },
  });
  return response.data;
};
