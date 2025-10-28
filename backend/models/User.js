const mongoose = require('mongoose');

/**
 * USER MODEL - Staff and admin accounts
 * 
 * This model stores all staff members and their roles:
 * - admin: Full system access
 * - manager: Hotel management access
 * - receptionist: Front desk operations
 * - housekeeping: Room cleaning tasks
 * - guest: Basic guest access (if needed)
 * 
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         email:
 *           type: string
 *           example: "john@hotel.com"
 *         passwordHash:
 *           type: string
 *           description: "Encrypted password (never sent to frontend)"
 *         role:
 *           type: string
 *           enum: [admin, manager, receptionist, housekeeping, guest]
 *           example: "manager"
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required: [email, passwordHash, role]
 */
const UserSchema = new mongoose.Schema(
	{
		// Email must be unique and lowercase
		email: { 
			type: String, 
			required: true, 
			unique: true, 
			lowercase: true, 
			trim: true 
		},
		
		// Encrypted password (never store plain text)
		passwordHash: { 
			type: String, 
			required: true 
		},
		
		// User role determines what they can access
		role: { 
			type: String, 
			enum: ['admin', 'manager', 'receptionist', 'housekeeping', 'guest'], 
			required: true 
		},
		
		// Can deactivate accounts without deleting them
		isActive: { 
			type: Boolean, 
			default: true 
		}
	},
	{ 
		timestamps: true // Adds createdAt and updatedAt automatically
	}
);

module.exports = mongoose.model('User', UserSchema);


