const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     HousekeepingTask:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         room:
 *           $ref: '#/components/schemas/Room'
 *         assignedTo:
 *           $ref: '#/components/schemas/User'
 *         status:
 *           type: string
 *           enum: [pending, in_progress, done]
 *         notes:
 *           type: string
 */
const HousekeepingTaskSchema = new mongoose.Schema(
	{
		room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
		assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		status: { type: String, enum: ['pending', 'in_progress', 'done'], default: 'pending' },
		notes: { type: String }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('HousekeepingTask', HousekeepingTaskSchema);


