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

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: Not found
 */
router.get('/:id', authMiddleware(['admin', 'manager']), ctrl.get);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: id
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
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, manager, receptionist, housekeeping, guest]
 *     responses:
 *       200:
 *         description: User updated
 */
router.put('/:id', authMiddleware(['admin']), ctrl.update);

/**
 * @swagger
 * /api/users/{id}/deactivate:
 *   put:
 *     tags: [Users]
 *     summary: Deactivate a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deactivated
 */
router.put('/:id/deactivate', authMiddleware(['admin']), ctrl.deactivate);

module.exports = router;


