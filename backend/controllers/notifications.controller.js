const Notification = require('../models/Notification');

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: System notifications
 */

exports.list = async (req, res, next) => {
	try {
		const items = await Notification.find().sort({ createdAt: -1 });
		res.json(items);
	} catch (err) { next(err); }
};

exports.markRead = async (req, res, next) => {
	try {
		const item = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
		if (!item) return res.status(404).json({ message: 'Not found' });
		res.json(item);
	} catch (err) { next(err); }
};


