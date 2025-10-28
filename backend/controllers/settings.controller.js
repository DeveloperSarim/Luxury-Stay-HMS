const Setting = require('../models/Setting');

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: System administration settings
 */

exports.get = async (req, res, next) => {
	try {
		const setting = await Setting.findOne({ key: req.params.key });
		if (!setting) return res.status(404).json({ message: 'Not found' });
		res.json(setting);
	} catch (err) { next(err); }
};

exports.set = async (req, res, next) => {
	try {
		const setting = await Setting.findOneAndUpdate(
			{ key: req.params.key },
			{ key: req.params.key, value: req.body.value },
			{ new: true, upsert: true }
		);
		res.json(setting);
	} catch (err) { next(err); }
};


