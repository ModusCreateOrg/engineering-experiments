const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const balanceSchema = mongoose.Schema(
  {
    accountId: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    lastTransactionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
balanceSchema.plugin(toJSON);

/**
 * @typedef Balance
 */
const Balance = mongoose.model('Balance', balanceSchema);

module.exports = Balance;
