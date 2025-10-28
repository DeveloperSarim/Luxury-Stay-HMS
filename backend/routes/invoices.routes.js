const router = require('express').Router();
const ctrl = require('../controllers/invoices.controller');
const { authMiddleware } = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     tags: [Invoices]
 *     summary: List invoices
 */
router.get('/', authMiddleware(['manager', 'receptionist', 'admin']), ctrl.list);

router.post('/', authMiddleware(['manager', 'receptionist']), ctrl.generate);

module.exports = router;


