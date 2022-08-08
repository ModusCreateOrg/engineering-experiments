const { Balance } = require('../models');
const { transactionTypes } = require('../constants/constant');
// const EXPENSE = "EXPENSE";
// const INCOME = "INCOME";
/**
 * Get balance by accountId
 * @param {String} accountId
 * @returns {Promise<Balance>}
 */
 const getBalanceByAccountId = async (accountId) => {
    return Balance.findOne({ accountId: accountId });
  };

  const createBalance = async (transactionEvent) => {
    const balance = {
      accountId: transactionEvent.accountId,
      value: balanceCalculation(transactionEvent),
      lastTransactionId: transactionEvent.id
    };
    return Balance.create(balance);
  };

  const updateBalance = async (id, balance, transactionEvent) => {
    balance.lastTransactionId =  transactionEvent.id;
    balance.value = accountBalanceCalculation(balance, transactionEvent);
    return await balance.save();
  };

  const balanceCalculation = (transaction) =>{
    let value =0;
    switch (transaction.type) {
      case transactionTypes.EXPENSE:
        value = -Math.abs(transaction.value);
        break;
      case transactionTypes.INCOME:
        value = transaction.value;
        break;
      default:
        break;
    }
    return value;
  }
  
  const accountBalanceCalculation = (balance, transaction) =>{
    let value =0;
    switch (transaction.type) {
      case transactionTypes.EXPENSE:
        value = balance.value - Math.abs(transaction.value);
        break;
      case transactionTypes.INCOME:
        value = balance.value + Math.abs(transaction.value);
        break;
      default:
        break;
    }
    return value;
  }

module.exports = {
    getBalanceByAccountId,
    updateBalance,
    createBalance,
};
