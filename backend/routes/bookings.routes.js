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

router.post('/', authMiddleware(['manager', 'receptionist']), ctrl.reserve);
router.patch('/:id/check-in', authMiddleware(['manager', 'receptionist']), ctrl.checkIn);
router.patch('/:id/check-out', authMiddleware(['manager', 'receptionist']), ctrl.checkOut);
router.patch('/:id/cancel', authMiddleware(['manager', 'receptionist']), ctrl.cancel);

module.exports = router;


