const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const logger = require('../config/logger');
const { transactionService } = require('../services');
const { environmentValues } = require('../constants/constant');
const amqp = require("amqplib/callback_api");

/**
 * A request handler function to create a transaction.
 */
const createTransaction = catchAsync(async (req, res) => {
  logger.info('TransactionController::createTransaction');
  const transaction = await transactionService.createTransaction(req.body);
    amqp.connect(environmentValues.AMQP_URL, (error, connection) => {
        connection.createChannel((channelConnectionError, amqpChannel) => {
        if (channelConnectionError) {
            throw new Error(channelConnectionError);
        }
            amqpChannel.sendToQueue(
                environmentValues.ITEM_CREATED,
                Buffer.from(JSON.stringify(transaction))
            );
        })
    });
  res.status(httpStatus.CREATED).send(transaction);
});

module.exports = {
  createTransaction,
};
