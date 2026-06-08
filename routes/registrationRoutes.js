import { Router } from 'express';
import { register, cancelRegistration } from '../controllers/registrationController.js';

const router = Router();

router.post('/', register);
router.delete('/:event_id/:user_name', cancelRegistration);

export default router;