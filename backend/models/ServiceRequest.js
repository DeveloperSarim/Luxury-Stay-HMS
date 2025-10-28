const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceRequest:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         guest:
 *           $ref: '#/components/schemas/Guest'
 *         type:
 *           type: string
 *         status:
 *           type: string
 *           enum: [open, in_progress, completed]
 *         notes:
 *           type: string
 */
const ServiceRequestSchema = new mongoose.Schema(
	{
		guest: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true },
		type: { type: String, required: true },
		status: { type: String, enum: ['open', 'in_progress', 'completed'], default: 'open' },
		notes: { type: String }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);


