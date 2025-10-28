const Invoice = require('../models/Invoice');

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Billing and invoices
 */

exports.generate = async (req, res, next) => {
	try {
		const { booking, items } = req.body;
		const total = (items || []).reduce((s, i) => s + Number(i.amount || 0), 0);
		const invoice = await Invoice.create({ booking, items, total });
		res.status(201).json(invoice);
	} catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
	try {
		const invoices = await Invoice.find().populate({ path: 'booking', populate: ['guest', 'room'] });
		res.json(invoices);
	} catch (err) { next(err); }
};


