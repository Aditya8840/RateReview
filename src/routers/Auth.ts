import { Router } from "express";
import * as Controllers from "../controllers/index.js";

const router = Router();

router.post("/register", Controllers.AuthController.register);
router.post("/login", Controllers.AuthController.login);

export { router as AuthRouter };