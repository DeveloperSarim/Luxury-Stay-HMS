const router = require('express').Router();
const ctrl = require('../controllers/invoices.controller');
const { authMiddleware } = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     tags: [Invoices]
 *     summary: List invoices
 */
router.get('/', authMiddleware(['manager', 'receptionist', 'admin']), ctrl.list);

/**
 * @swagger
 * /api/invoices:
 *   post:
 *     tags: [Invoices]
 *     summary: Generate invoice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bookingId]
 *             properties:
 *               bookingId:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Invoice generated
 */
router.post('/', authMiddleware(['manager', 'receptionist']), ctrl.generate);

module.exports = router;


