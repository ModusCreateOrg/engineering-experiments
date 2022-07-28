const { Transaction } = require('../models');
const logger = require('../config/logger');

/**
 * Create a Transaction objects in the database.
 */
const createTransaction = async (transaction) => {
  return Transaction.create(transaction);
};

module.exports = {
    createTransaction,
};
