const router = require('express').Router();
const ctrl = require('../controllers/notifications.controller');
const { authMiddleware } = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     tags: [Notifications]
 *     summary: List notifications
 */
router.get('/', authMiddleware(), ctrl.list);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   put:
 *     tags: [Notifications]
 *     summary: Mark notification as read
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Marked as read
 */
router.put('/:id/read', authMiddleware(), ctrl.markRead);

module.exports = router;


