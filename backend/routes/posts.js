import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  commentPost,
} from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";
import { deleteComment } from "../controllers/post.js";

const router = express.Router();
// READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);

//UPDATE
router.patch("/:id/like", verifyToken, likePost);

//COMMENT
router.post("/:postId/comment", verifyToken, commentPost);

// DELETE COMMENT
router.delete("/:postId/comment/:_id", deleteComment);
export default router;
