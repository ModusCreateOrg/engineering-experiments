  const environmentValues = {
    AMQP_URL: process.env.AMQP_URL,
    ITEM_CREATED: process.env.ITEM_CREATED,
  };

  const transactionTypes = {
     EXPENSE: "EXPENSE",
     INCOME: "INCOME",
  };
  
  module.exports = {
    environmentValues,
    transactionTypes
  };
  