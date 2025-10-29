const router = require('express').Router();
const ctrl = require('../controllers/bookings.controller');
const { authMiddleware } = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     tags: [Bookings]
 *     summary: List bookings
 */
router.get('/', authMiddleware(), ctrl.list);

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     tags: [Bookings]
 *     summary: Create a booking
 *     description: Receptionist or manager can create a booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [guestId, roomId, checkInDate, checkOutDate]
 *             properties:
 *               guestId:
 *                 type: string
 *               roomId:
 *                 type: string
 *               checkInDate:
 *                 type: string
 *                 format: date
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Booking created
 */
router.post('/', authMiddleware(['manager', 'receptionist']), ctrl.reserve);

/**
 * @swagger
 * /api/bookings/{id}/check-in:
 *   put:
 *     tags: [Bookings]
 *     summary: Check-in a booking
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Checked in successfully
 */
router.put('/:id/check-in', authMiddleware(['manager', 'receptionist']), ctrl.checkIn);

/**
 * @swagger
 * /api/bookings/{id}/check-out:
 *   put:
 *     tags: [Bookings]
 *     summary: Check-out a booking
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Checked out successfully
 */
router.put('/:id/check-out', authMiddleware(['manager', 'receptionist']), ctrl.checkOut);

/**
 * @swagger
 * /api/bookings/{id}/cancel:
 *   put:
 *     tags: [Bookings]
 *     summary: Cancel a booking
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking cancelled
 */
router.put('/:id/cancel', authMiddleware(['manager', 'receptionist']), ctrl.cancel);

module.exports = router;


