import { Router } from "express";
import userRouter from './user.routes.js'
import postRoutes from './post.routes.js'

const router = Router();

router.use('/api/user', userRouter);
router.use('/api/post', postRoutes);

export default router;