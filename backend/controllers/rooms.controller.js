const Room = require('../models/Room');

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room inventory and status
 */

exports.list = async (req, res, next) => {
	try {
		const rooms = await Room.find();
		res.json(rooms);
	} catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
	try {
		const room = await Room.create(req.body);
		res.status(201).json(room);
	} catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
	try {
		const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!room) return res.status(404).json({ message: 'Not found' });
		res.json(room);
	} catch (err) { next(err); }
};

exports.setStatus = async (req, res, next) => {
	try {
		const room = await Room.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
		if (!room) return res.status(404).json({ message: 'Not found' });
		res.json(room);
	} catch (err) { next(err); }
};


