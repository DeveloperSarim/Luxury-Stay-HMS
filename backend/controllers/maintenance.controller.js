const MaintenanceRequest = require('../models/MaintenanceRequest');

/**
 * @swagger
 * tags:
 *   name: Maintenance
 *   description: Maintenance requests
 */

exports.list = async (req, res, next) => {
	try {
		const items = await MaintenanceRequest.find().populate('room reportedBy');
		res.json(items);
	} catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
	try {
		const item = await MaintenanceRequest.create(req.body);
		res.status(201).json(item);
	} catch (err) { next(err); }
};

exports.resolve = async (req, res, next) => {
	try {
		const item = await MaintenanceRequest.findByIdAndUpdate(req.params.id, { status: 'resolved' }, { new: true });
		if (!item) return res.status(404).json({ message: 'Not found' });
		res.json(item);
	} catch (err) { next(err); }
};


