const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         booking:
 *           $ref: '#/components/schemas/Booking'
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *         total:
 *           type: number
 *         status:
 *           type: string
 *           enum: [unpaid, paid, void]
 */
const InvoiceSchema = new mongoose.Schema(
	{
		booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
		items: [
			{
				description: { type: String, required: true },
				amount: { type: Number, required: true }
			}
		],
		total: { type: Number, required: true, default: 0 },
		status: { type: String, enum: ['unpaid', 'paid', 'void'], default: 'unpaid' }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Invoice', InvoiceSchema);


