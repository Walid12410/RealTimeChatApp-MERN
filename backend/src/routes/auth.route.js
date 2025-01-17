import express from "express";
import { loginController,
    logoutController,
    signupController,
    updateProfileController,
    checkAuthController
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// api/auth/signup
router.post('/signup', signupController);
// api/auth/login
router.post('/login', loginController);
// api/auth/logout
router.post('/logout', logoutController);

// api/auth/update-profile
router.put("/update-profile", verifyToken ,updateProfileController);

// api/auth/check
router.get("/check", verifyToken, checkAuthController);


export default router;