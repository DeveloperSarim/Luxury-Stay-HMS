const User = require('../models/User');

/**
 * USERS CONTROLLER - Staff management system
 * 
 * Features:
 * - List all staff members
 * - Create new staff accounts
 * - Update staff information
 * - Deactivate staff accounts
 * - Role-based access (admin/manager only)
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Staff management system
 */

// Get all users (staff members)
exports.list = async (req, res, next) => {
	try {
		const users = await User.find().select('-passwordHash');
		res.json({
			success: true,
			count: users.length,
			users: users
		});
	} catch (err) { 
		next(err); 
	}
};

// Get single user by ID
exports.get = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id).select('-passwordHash');
		if (!user) {
			return res.status(404).json({ 
				success: false,
				message: 'User not found' 
			});
		}
		res.json({
			success: true,
			user: user
		});
	} catch (err) { 
		next(err); 
	}
};

// Create new user (staff member)
exports.create = async (req, res, next) => {
	try {
		const { email, password, role } = req.body;
		
		// Check if email already exists
		const existing = await User.findOne({ email });
		if (existing) {
			return res.status(400).json({
				success: false,
				message: 'Email already exists'
			});
		}
		
		const user = await User.create(req.body);
		res.status(201).json({
			success: true,
			message: 'User created successfully',
			user: {
				_id: user._id,
				email: user.email,
				role: user.role,
				isActive: user.isActive
			}
		});
	} catch (err) { 
		next(err); 
	}
};

// Update user information
exports.update = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id, 
			req.body, 
			{ new: true }
		).select('-passwordHash');
		
		if (!user) {
			return res.status(404).json({ 
				success: false,
				message: 'User not found' 
			});
		}
		
		res.json({
			success: true,
			message: 'User updated successfully',
			user: user
		});
	} catch (err) { 
		next(err); 
	}
};

// Deactivate user account
exports.deactivate = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id, 
			{ isActive: false }, 
			{ new: true }
		).select('-passwordHash');
		
		if (!user) {
			return res.status(404).json({ 
				success: false,
				message: 'User not found' 
			});
		}
		
		res.json({
			success: true,
			message: 'User deactivated successfully',
			user: user
		});
	} catch (err) { 
		next(err); 
	}
};


