const router = require('express').Router();
const ctrl = require('../controllers/feedback.controller');
const { authMiddleware } = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/feedback:
 *   get:
 *     tags: [Feedback]
 *     summary: List feedback
 */
router.get('/', authMiddleware(['manager', 'admin']), ctrl.list);

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     tags: [Feedback]
 *     summary: Submit feedback
 *     description: Public endpoint to submit feedback
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               message:
 *                 type: string
 *               rating:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Feedback submitted
 */
router.post('/', ctrl.create);

module.exports = router;


