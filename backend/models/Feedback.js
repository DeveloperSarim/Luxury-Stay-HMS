const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         guest:
 *           $ref: '#/components/schemas/Guest'
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         comments:
 *           type: string
 */
const FeedbackSchema = new mongoose.Schema(
	{
		guest: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true },
		rating: { type: Number, min: 1, max: 5, required: true },
		comments: { type: String }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Feedback', FeedbackSchema);


