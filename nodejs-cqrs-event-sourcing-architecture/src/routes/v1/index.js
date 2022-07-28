const express = require('express');
const transactionRoute = require('./transaction.route');
const balanceRoute = require('./balance.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/transactions',
    route: transactionRoute,
  },
  {
    path: '/balances',
    route: balanceRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
