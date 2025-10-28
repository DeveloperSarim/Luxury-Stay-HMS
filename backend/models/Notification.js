const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         type:
 *           type: string
 *         message:
 *           type: string
 *         read:
 *           type: boolean
 */
const NotificationSchema = new mongoose.Schema(
	{
		type: { type: String, required: true },
		message: { type: String, required: true },
		read: { type: Boolean, default: false }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Notification', NotificationSchema);


