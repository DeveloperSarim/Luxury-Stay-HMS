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
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 */
router.put('/:key', authMiddleware(['admin']), ctrl.set);

module.exports = router;


