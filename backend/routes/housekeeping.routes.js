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

router.post('/', authMiddleware(['manager']), ctrl.create);
router.patch('/:id/complete', authMiddleware(['manager', 'housekeeping']), ctrl.complete);

module.exports = router;


