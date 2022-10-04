import { Router } from "express";
import { authUser, profile, signUp } from "../controllers/userControllers";
import checkAuht from "../middleware/checkAuth";

const router = Router();

router.post("/", signUp);
router.post("/login", authUser);
router.get("/profile", checkAuht, profile);

export default router;
