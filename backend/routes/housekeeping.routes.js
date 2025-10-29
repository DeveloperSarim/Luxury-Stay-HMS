const router = require('express').Router();
const ctrl = require('../controllers/housekeeping.controller');
const { authMiddleware } = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/housekeeping:
 *   get:
 *     tags: [Housekeeping]
 *     summary: List housekeeping tasks
 */
router.get('/', authMiddleware(['manager', 'housekeeping']), ctrl.list);

/**
 * @swagger
 * /api/housekeeping:
 *   post:
 *     tags: [Housekeeping]
 *     summary: Create housekeeping task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [roomId, task]
 *             properties:
 *               roomId:
 *                 type: string
 *               task:
 *                 type: string
 *                 example: "Change linens"
 *     responses:
 *       201:
 *         description: Task created
 */
router.post('/', authMiddleware(['manager']), ctrl.create);

/**
 * @swagger
 * /api/housekeeping/{id}/complete:
 *   put:
 *     tags: [Housekeeping]
 *     summary: Mark housekeeping task complete
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task completed
 */
router.put('/:id/complete', authMiddleware(['manager', 'housekeeping']), ctrl.complete);

module.exports = router;


