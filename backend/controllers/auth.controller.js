const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * AUTH CONTROLLER - User login/register system
 * 
 * Features:
 * - User registration with email/password
 * - User login with JWT token
 * - Password encryption with bcrypt
 * - Role-based access control
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication system
 */

// Register new user
exports.register = async (req, res, next) => {
	try {
		const { email, password, role } = req.body;
		
		// Check if email already exists
		const existing = await User.findOne({ email });
		if (existing) {
			return res.status(400).json({ 
				success: false,
				message: 'Email already in use' 
			});
		}
		
		// Encrypt password
		const passwordHash = await bcrypt.hash(password, 10);
		
		// Create new user
		const user = await User.create({ 
			email, 
			passwordHash, 
			role 
		});
		
		// Return user info (without password)
		res.status(201).json({ 
			success: true,
			message: 'User created successfully',
			user: { 
				_id: user._id, 
				email: user.email, 
				role: user.role 
			}
		});
	} catch (err) { 
		next(err); 
	}
};

// Login user
exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		
		// Find active user
		const user = await User.findOne({ email, isActive: true });
		if (!user) {
			return res.status(401).json({ 
				success: false,
				message: 'Invalid email or password' 
			});
		}
		
		// Check password
		const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
		if (!isPasswordValid) {
			return res.status(401).json({ 
				success: false,
				message: 'Invalid email or password' 
			});
		}
		
		// Create JWT token
		const token = jwt.sign(
			{ 
				sub: user._id, 
				role: user.role 
			}, 
			process.env.JWT_SECRET || 'dev_secret', 
			{ expiresIn: '7d' }
		);
		
		res.json({ 
			success: true,
			message: 'Login successful',
			token, 
			user: { 
				_id: user._id, 
				email: user.email, 
				role: user.role 
			}
		});
	} catch (err) { 
		next(err); 
	}
};

// Get current user info
exports.me = async (req, res) => {
	res.json({ 
		success: true,
		user: req.user 
	});
};

// Middleware to check if user is logged in
exports.authMiddleware = (allowedRoles = []) => {
    return (req, res, next) => {
        try {
            // Extract token from multiple sources for robustness
            const authHeader = req.headers.authorization || req.headers.Authorization || '';
            let token = null;

            if (typeof authHeader === 'string' && authHeader.toLowerCase().startsWith('bearer ')) {
                token = authHeader.slice(7).trim();
            }

            if (!token) {
                // Fallbacks: x-access-token header or query param
                token = (req.headers['x-access-token'] || req.query.token || '').toString().trim();
            }

            if (!token) {
                return res.status(401).json({ 
                    success: false,
                    message: 'No token provided' 
                });
            }
            
            // Verify token
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
            req.user = payload;
            
            // Check if user has required role
            if (allowedRoles.length && !allowedRoles.includes(payload.role)) {
                return res.status(403).json({ 
                    success: false,
                    message: 'Access denied. Required role: ' + allowedRoles.join(' or ') 
                });
            }
            
            next();
        } catch (e) {
            if (e && e.name === 'TokenExpiredError') {
                return res.status(401).json({ success: false, message: 'Token expired' });
            }
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    };
};


