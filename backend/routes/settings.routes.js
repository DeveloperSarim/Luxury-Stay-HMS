const router = require('express').Router();
const ctrl = require('../controllers/settings.controller');
const { authMiddleware } = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/settings/{key}:
 *   get:
 *     tags: [Settings]
 *     summary: Get a setting
 */
router.get('/:key', authMiddleware(['admin', 'manager']), ctrl.get);

/**
 * @swagger
 * /api/settings/{key}:
 *   put:
 *     tags: [Settings]
 *     summary: Set a setting
 */
router.put('/:key', authMiddleware(['admin']), ctrl.set);

module.exports = router;


