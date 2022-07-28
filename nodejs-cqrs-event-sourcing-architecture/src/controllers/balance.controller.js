const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const logger = require('../config/logger');
const { balanceService } = require('../services');
const amqp = require("amqplib/callback_api");

const EXPENSE = "EXPENSE";
const INCOME = "INCOME";

const getBalance = catchAsync(async (req, res) => {
    logger.info('BalanceController::getBalance');
    const balance = await balanceService.getBalanceByAccountId(req.params.accountId);
    if (!balance) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Account not found');
    }
    res.send(balance);
  });

  amqp.connect(process.env.AMQP_URL, (error, connection) => {
    if (error) {
      throw new Error(error.message);
    }

    connection.createChannel((channelConnectionError, amqpChannel) => {
      if (channelConnectionError) {
        throw new Error(channelConnectionError.message);
      }

      amqpChannel.assertQueue(process.env.ITEM_CREATED, { durable: false });

      amqpChannel.consume(
        process.env.ITEM_CREATED,
        async (msg) => {
          const createTransactionEvent = JSON.parse(msg.content.toString());
          const accountId = createTransactionEvent.accountId;
          const balance = await balanceService.getBalanceByAccountId(accountId);
          if(!balance ){
            const requestObject = {
                accountId: accountId,
                value: balanceCalculation(createTransactionEvent),
                lastTransactionId: createTransactionEvent.id
            };
            await balanceService.createBalance(requestObject);
          }
          else{
            const requestObject = {
              accountId: accountId,
              value: accountBalanceCalculation(balance, createTransactionEvent),
              lastTransactionId: createTransactionEvent.id
            };
            await balanceService.updateBalance(balance.id, requestObject);
          }
        },
        { noAck: true }
      );

    })

});

const balanceCalculation = (transaction) =>{
  let value =0;
  switch (transaction.type) {
    case EXPENSE:
      value = -Math.abs(transaction.value);
      break;
    case INCOME:
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
    case EXPENSE:
      value = balance.value - Math.abs(transaction.value);
      break;
    case INCOME:
      value = balance.value + Math.abs(transaction.value);
      break;
    default:
      break;
  }
  return value;
}

module.exports = {
    getBalance,
};
