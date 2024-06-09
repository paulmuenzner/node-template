import express from 'express';
import UserController from '../controllers/user';
import { validate } from '../utils';
import { getUserSchema } from '../validation';

import { UserRepo } from '../repos';

const userRepo = new UserRepo();
const userController = new UserController(userRepo);

const router = express.Router();

/**
 * @openapi
 * '/api/auth/getUser':
 *  get:
 *     tags:
 *     - Get User
 *     summary: Get user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/validation/GetUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/validation/GetUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */
router.get('/getuser', validate(getUserSchema), userController.getUser);

module.exports = router;
