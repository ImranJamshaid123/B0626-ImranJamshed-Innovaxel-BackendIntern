import { Router } from 'express';
import { getAllEvents, createEvent } from '../controllers/eventController.js';

const router = Router();

router.get('/', getAllEvents);
router.post('/', createEvent);

export default router;
