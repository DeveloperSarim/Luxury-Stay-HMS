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

router.post('/', ctrl.create);
router.put('/:id', authMiddleware(), ctrl.update);

module.exports = router;


