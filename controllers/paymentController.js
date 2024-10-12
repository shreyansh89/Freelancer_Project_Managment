const Payment = require('../models/payment');

module.exports.createPayment = async (req, res) => {
  const payment = await Payment.create(req.body);
  res.status(201).json({ status: 'success', data: payment });
};

module.exports.markAsPaid = async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  payment.status = 'paid';
  await payment.save();
  res.status(200).json({ status: 'success', data: payment });
};
