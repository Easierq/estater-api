import express from "express";
import { verifyAdmin, verifyToken } from "../middleware/verifyToken.js";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyAdmin, addPost);
router.put("/:id", verifyAdmin, updatePost);
// router.delete("/:id", deletePost);
router.delete("/:id", verifyAdmin, deletePost);

export default router;
