const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         guest:
 *           $ref: '#/components/schemas/Guest'
 *         room:
 *           $ref: '#/components/schemas/Room'
 *         checkIn:
 *           type: string
 *           format: date-time
 *         checkOut:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [reserved, checked_in, checked_out, cancelled]
 */
const BookingSchema = new mongoose.Schema(
	{
		guest: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true },
		room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
		checkIn: { type: Date, required: true },
		checkOut: { type: Date, required: true },
		status: { type: String, enum: ['reserved', 'checked_in', 'checked_out', 'cancelled'], default: 'reserved' }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Booking', BookingSchema);


