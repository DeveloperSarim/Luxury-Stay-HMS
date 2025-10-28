const User = require('../models/User');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manage users and staff roles
 */

exports.list = async (req, res, next) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) return res.status(404).json({ message: 'Not found' });
		res.json(user);
	} catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json(user);
	} catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!user) return res.status(404).json({ message: 'Not found' });
		res.json(user);
	} catch (err) { next(err); }
};

exports.deactivate = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
		if (!user) return res.status(404).json({ message: 'Not found' });
		res.json(user);
	} catch (err) { next(err); }
};


