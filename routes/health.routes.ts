import express from 'express';
import healthControllers from '../controllers/health';

const router = express.Router();

/**
 * @openapi
 * /healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 *       500:
 *         description: Internal server error
 */

router.get('/', healthControllers.health);

module.exports = router;
