const { Balance } = require('../models');
const logger = require('../config/logger');

/**
 * Get balance by accountId
 * @param {String} accountId
 * @returns {Promise<Balance>}
 */
 const getBalanceByAccountId = async (accountId) => {
    return Balance.findOne({ accountId: accountId });
  };

  const createBalance = async (balance) => {
    return Balance.create(balance);
  };

  const updateBalance = async (id, balance) => {
    return Balance.updateOne({ _id: id }, balance);
  };

module.exports = {
    getBalanceByAccountId,
    updateBalance,
    createBalance,
};
