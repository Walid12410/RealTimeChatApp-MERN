import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { getUserForSideBarController,
    getMessagesController,
    sendMessageController
} from "../controllers/message.controller.js";
import validationObjectId  from "../middleware/validObjectId.middleware.js";

// api/message/user
router.get("/user",verifyToken, getUserForSideBarController);

// api/message/:id
router.get("/:id",validationObjectId,verifyToken, getMessagesController);

// api/message/send/:id
router.post("/send/:id",validationObjectId,verifyToken, sendMessageController);

const router = express.Router();



