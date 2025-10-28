const HousekeepingTask = require('../models/HousekeepingTask');
const Room = require('../models/Room');

/**
 * @swagger
 * tags:
 *   name: Housekeeping
 *   description: Housekeeping task management
 */

exports.list = async (req, res, next) => {
	try {
		const tasks = await HousekeepingTask.find().populate('room assignedTo');
		res.json(tasks);
	} catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
	try {
		const task = await HousekeepingTask.create(req.body);
		res.status(201).json(task);
	} catch (err) { next(err); }
};

exports.complete = async (req, res, next) => {
	try {
		const task = await HousekeepingTask.findByIdAndUpdate(req.params.id, { status: 'done' }, { new: true });
		if (!task) return res.status(404).json({ message: 'Not found' });
		await Room.findByIdAndUpdate(task.room, { status: 'available' });
		res.json(task);
	} catch (err) { next(err); }
};


