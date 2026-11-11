import express from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id')
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.route('/:id/like').put(protect, toggleLike);
router.route('/:id/comment').post(protect, addComment);

export default router;