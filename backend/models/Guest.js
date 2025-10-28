const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Guest:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         preferences:
 *           type: object
 */
const GuestSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		email: { type: String, trim: true, lowercase: true },
		phone: { type: String, trim: true },
		preferences: { type: mongoose.Schema.Types.Mixed }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Guest', GuestSchema);


