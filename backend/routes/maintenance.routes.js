const router = require('express').Router();
const ctrl = require('../controllers/maintenance.controller');
const { authMiddleware } = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/maintenance:
 *   get:
 *     tags: [Maintenance]
 *     summary: List maintenance requests
 */
router.get('/', authMiddleware(), ctrl.list);

/**
 * @swagger
 * /api/maintenance:
 *   post:
 *     tags: [Maintenance]
 *     summary: Create maintenance request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [roomId, issue]
 *             properties:
 *               roomId:
 *                 type: string
 *               issue:
 *                 type: string
 *                 example: "AC not working"
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', authMiddleware(), ctrl.create);

/**
 * @swagger
 * /api/maintenance/{id}/resolve:
 *   put:
 *     tags: [Maintenance]
 *     summary: Resolve maintenance request
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resolved
 */
router.put('/:id/resolve', authMiddleware(), ctrl.resolve);

module.exports = router;


