import { Router } from 'express';
import { chatRoutes } from './chat.routes';


const router = Router();


router.use('/api', chatRoutes);


export const routes = router;
