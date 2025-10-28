const router = require('express').Router();
const ctrl = require('../controllers/users.controller');
const { authMiddleware } = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: List users
 */
router.get('/', authMiddleware(['admin', 'manager']), ctrl.list);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [Users]
 *     summary: Create user
 */
router.post('/', authMiddleware(['admin']), ctrl.create);

router.get('/:id', authMiddleware(['admin', 'manager']), ctrl.get);
router.put('/:id', authMiddleware(['admin']), ctrl.update);
router.patch('/:id/deactivate', authMiddleware(['admin']), ctrl.deactivate);

module.exports = router;


