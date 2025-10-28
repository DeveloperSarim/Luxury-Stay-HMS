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

router.post('/', ctrl.create);

module.exports = router;


