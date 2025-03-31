import { Router } from 'express';
import { createPost, fetchAllPost, updatePost, deletePost, fetchPostById } from '../controller/post.controller.js';

const router = Router();

router.post('/', createPost);
router.get('/', fetchAllPost);
router.get('/:postId', fetchPostById);
router.put('/:postId', updatePost);
router.delete('/:postId', deletePost);

export default router;
