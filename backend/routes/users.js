import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getUserByName,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:id", verifyToken, getUser);
router.get("/:userName/user", getUserByName);
router.get("/:id/friends", verifyToken, getUserFriends);

//UPDATE
router.patch("/:id/:friendId", addRemoveFriend);

export default router;
