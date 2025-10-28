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

router.post('/', authMiddleware(), ctrl.create);
router.patch('/:id/resolve', authMiddleware(), ctrl.resolve);

module.exports = router;


