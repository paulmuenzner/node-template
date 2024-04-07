import express from 'express';
import authControllers from '../controllers/auth';

const router = express.Router();

router.post('/login', authControllers.login);

module.exports = router;
