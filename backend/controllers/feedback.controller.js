const Feedback = require('../models/Feedback');

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Guest feedback and ratings
 */

exports.create = async (req, res, next) => {
	try {
		const feedback = await Feedback.create(req.body);
		res.status(201).json(feedback);
	} catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
	try {
		const items = await Feedback.find().populate('guest');
		res.json(items);
	} catch (err) { next(err); }
};


