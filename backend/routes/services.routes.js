const router = require('express').Router();
const ctrl = require('../controllers/services.controller');
const { authMiddleware } = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/services:
 *   get:
 *     tags: [Services]
 *     summary: List service requests
 */
router.get('/', authMiddleware(), ctrl.list);

/**
 * @swagger
 * /api/services:
 *   post:
 *     tags: [Services]
 *     summary: Create a service request
 *     description: Public endpoint to create a service request
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [guestName, roomNumber, serviceType]
 *             properties:
 *               guestName:
 *                 type: string
 *               roomNumber:
 *                 type: string
 *               serviceType:
 *                 type: string
 *                 example: "Spa"
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Service request created
 */
router.post('/', ctrl.create);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     tags: [Services]
 *     summary: Update a service request
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: completed
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/:id', authMiddleware(), ctrl.update);

module.exports = router;


