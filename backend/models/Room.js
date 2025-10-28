const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         number:
 *           type: string
 *         type:
 *           type: string
 *         status:
 *           type: string
 *           enum: [available, occupied, cleaning, maintenance]
 *         price:
 *           type: number
 */
const RoomSchema = new mongoose.Schema(
	{
		number: { type: String, required: true, unique: true },
		type: { type: String, required: true },
		status: { type: String, enum: ['available', 'occupied', 'cleaning', 'maintenance'], default: 'available' },
		price: { type: Number, required: true }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Room', RoomSchema);


