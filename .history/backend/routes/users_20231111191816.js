import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from "../controllers/users.js";
import { veifyToken } from "../middleware/auth.js";

const router = express.Router();

router