const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *         passwordHash:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, manager, receptionist, housekeeping, guest]
 *         isActive:
 *           type: boolean
 *       required: [email, passwordHash, role]
 */
const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true, lowercase: true, trim: true },
		passwordHash: { type: String, required: true },
		role: { type: String, enum: ['admin', 'manager', 'receptionist', 'housekeeping', 'guest'], required: true },
		isActive: { type: Boolean, default: true }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);


