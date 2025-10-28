const router = require('express').Router();
const ctrl = require('../controllers/rooms.controller');
const { authMiddleware } = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     tags: [Rooms]
 *     summary: List rooms
 */
router.get('/', authMiddleware(), ctrl.list);

router.post('/', authMiddleware(['admin', 'manager']), ctrl.create);
router.put('/:id', authMiddleware(['admin', 'manager']), ctrl.update);
router.patch('/:id/status', authMiddleware(), ctrl.setStatus);

module.exports = router;


