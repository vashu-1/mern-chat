import express from "express";
import { sendMessage } from "../controllers/messageController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/:id").get(isAuthenticated, getMessages);

export default router;
