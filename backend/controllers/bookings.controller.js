const Booking = require('../models/Booking');
const Room = require('../models/Room');

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Reservations and check-in/out
 */

exports.list = async (req, res, next) => {
	try {
		const bookings = await Booking.find().populate('guest room');
		res.json(bookings);
	} catch (err) { next(err); }
};

exports.reserve = async (req, res, next) => {
	try {
		const booking = await Booking.create(req.body);
		await Room.findByIdAndUpdate(booking.room, { status: 'occupied' });
		res.status(201).json(booking);
	} catch (err) { next(err); }
};

exports.checkIn = async (req, res, next) => {
	try {
		const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'checked_in' }, { new: true });
		if (!booking) return res.status(404).json({ message: 'Not found' });
		await Room.findByIdAndUpdate(booking.room, { status: 'occupied' });
		res.json(booking);
	} catch (err) { next(err); }
};

exports.checkOut = async (req, res, next) => {
	try {
		const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'checked_out' }, { new: true });
		if (!booking) return res.status(404).json({ message: 'Not found' });
		await Room.findByIdAndUpdate(booking.room, { status: 'cleaning' });
		res.json(booking);
	} catch (err) { next(err); }
};

exports.cancel = async (req, res, next) => {
	try {
		const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
		if (!booking) return res.status(404).json({ message: 'Not found' });
		await Room.findByIdAndUpdate(booking.room, { status: 'available' });
		res.json(booking);
	} catch (err) { next(err); }
};


