const ServiceRequest = require('../models/ServiceRequest');

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Additional guest services
 */

exports.create = async (req, res, next) => {
	try {
		const srv = await ServiceRequest.create(req.body);
		res.status(201).json(srv);
	} catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
	try {
		const items = await ServiceRequest.find().populate('guest');
		res.json(items);
	} catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
	try {
		const srv = await ServiceRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!srv) return res.status(404).json({ message: 'Not found' });
		res.json(srv);
	} catch (err) { next(err); }
};


