const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

exports.register = async (req, res, next) => {
	try {
		const { email, password, role } = req.body;
		const existing = await User.findOne({ email });
		if (existing) return res.status(400).json({ message: 'Email already in use' });
		const passwordHash = await bcrypt.hash(password, 10);
		const user = await User.create({ email, passwordHash, role });
		res.status(201).json({ _id: user._id, email: user.email, role: user.role });
	} catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email, isActive: true });
		if (!user) return res.status(401).json({ message: 'Invalid credentials' });
		const ok = await bcrypt.compare(password, user.passwordHash);
		if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
		const token = jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
		res.json({ token, user: { _id: user._id, email: user.email, role: user.role } });
	} catch (err) { next(err); }
};

exports.me = async (req, res) => {
	res.json({ user: req.user });
};

exports.authMiddleware = (roles = []) => {
	return (req, res, next) => {
		try {
			const hdr = req.headers.authorization || '';
			const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
			if (!token) return res.status(401).json({ message: 'Unauthorized' });
			const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
			req.user = payload;
			if (roles.length && !roles.includes(payload.role)) {
				return res.status(403).json({ message: 'Forbidden' });
			}
			next();
		} catch (e) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
	};
};


