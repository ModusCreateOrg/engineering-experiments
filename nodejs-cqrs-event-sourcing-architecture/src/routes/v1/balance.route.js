const express = require('express');
const balanceController = require('../../controllers/balance.controller');

const router = express.Router();

router.route('/:accountId').get(balanceController.getBalance);

module.exports = router;
