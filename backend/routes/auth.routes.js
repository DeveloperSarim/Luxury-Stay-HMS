const router = require('express').Router();
const auth = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/register', auth.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login and receive JWT
 */
router.post('/login', auth.login);

module.exports = router;


