const express = require('express');

const router = express.Router();

const Paymentcontroller = require('../controllers/paymentController');

const { protect }  = require('../middlewares/authMiddleware');





router.post('/', protect, Paymentcontroller.createPayment);

router.patch('/:id/pay', protect, Paymentcontroller.markAsPaid);

module.exports = router;