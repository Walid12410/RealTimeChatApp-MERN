import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { getUserForSideBarController,
    getMessagesController,
    sendMessageController
} from "../controllers/message.controller.js";

const router = express.Router();

// api/messages/users
router.get("/users",verifyToken, getUserForSideBarController);

// api/message/:id
router.get("/:id",verifyToken, getMessagesController);

// api/message/send/:id
router.post("/send/:id",verifyToken, sendMessageController);

export default router;



