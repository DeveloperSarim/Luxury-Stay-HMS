const router = require('express').Router();
const ctrl = require('../controllers/rooms.controller');
const { authMiddleware } = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     tags: [Rooms]
 *     summary: List rooms
 */
router.get('/', authMiddleware(), ctrl.list);

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     tags: [Rooms]
 *     summary: Create a room
 *     description: Admins and managers can create new rooms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [number, type, price]
 *             properties:
 *               number:
 *                 type: string
 *                 example: "101"
 *               type:
 *                 type: string
 *                 example: "Deluxe"
 *               price:
 *                 type: number
 *                 example: 5000
 *               status:
 *                 type: string
 *                 enum: [available, occupied, cleaning, maintenance]
 *                 example: available
 *     responses:
 *       201:
 *         description: Room created
 *       400:
 *         description: Validation error
 */
router.post('/', authMiddleware(['admin', 'manager']), ctrl.create);

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     tags: [Rooms]
 *     summary: Update a room
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
 *               number:
 *                 type: string
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [available, occupied, cleaning, maintenance]
 *     responses:
 *       200:
 *         description: Room updated
 *       404:
 *         description: Room not found
 */
router.put('/:id', authMiddleware(['admin', 'manager']), ctrl.update);

/**
 * @swagger
 * /api/rooms/{id}/status:
 *   put:
 *     tags: [Rooms]
 *     summary: Update room status
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
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [available, occupied, cleaning, maintenance]
 *                 example: occupied
 *     responses:
 *       200:
 *         description: Status updated
 *       404:
 *         description: Room not found
 */
router.put('/:id/status', authMiddleware(), ctrl.setStatus);

module.exports = router;


