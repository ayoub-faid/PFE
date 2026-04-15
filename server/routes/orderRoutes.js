const express = require('express');
const { checkoutOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/', checkoutOrder);

module.exports = router;
