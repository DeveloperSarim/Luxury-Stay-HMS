const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Setting:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         key:
 *           type: string
 *         value:
 *           type: object
 */
const SettingSchema = new mongoose.Schema(
	{
		key: { type: String, required: true, unique: true },
		value: { type: mongoose.Schema.Types.Mixed, required: true }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Setting', SettingSchema);


