const { Transaction } = require('../models');
/**
 * Create a Transaction objects in the database.
 */
const createTransaction = async (transaction) => {
  return Transaction.create(transaction);
};

module.exports = {
    createTransaction,
};
