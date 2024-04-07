import express from 'express';
import defaultControllers from '../controllers/default';

const router = express.Router();

router.post('/placeholder', defaultControllers.placeholder);

module.exports = router;
