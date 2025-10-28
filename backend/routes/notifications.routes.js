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

router.patch('/:id/read', authMiddleware(), ctrl.markRead);

module.exports = router;


