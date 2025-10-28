const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     MaintenanceRequest:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         room:
 *           $ref: '#/components/schemas/Room'
 *         reportedBy:
 *           $ref: '#/components/schemas/User'
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum: [open, in_progress, resolved]
 */
const MaintenanceRequestSchema = new mongoose.Schema(
	{
		room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
		reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		description: { type: String, required: true },
		status: { type: String, enum: ['open', 'in_progress', 'resolved'], default: 'open' }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('MaintenanceRequest', MaintenanceRequestSchema);


