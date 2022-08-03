const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const logger = require('../config/logger');
const { balanceService } = require('../services');
const { ApiError } = require('../utils/ApiError');
const amqp = require("amqplib/callback_api");

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
            await balanceService.createBalance(createTransactionEvent);
          }
          else{
            await balanceService.updateBalance(balance.id, balance, createTransactionEvent);
          }
        },
        { noAck: true }
      );
    })
});

module.exports = {
    getBalance,
};
