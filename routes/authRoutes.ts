import express from 'express';
import authControllers from '../controllers/auth';
import { validate } from '../utils';
import { createUserSchema } from '../validation';

const router = express.Router();

/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *     tags:
 *     - Login
 *     summary: Login as user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */
router.post('/login', validate(createUserSchema), authControllers.login);

module.exports = router;
