import { Router } from "express";
import { loginUser, registerUser, verifyEmail } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";

import { userRegistrationValidator } from "../validators/index.js";

const router = Router();

router
  .route("/register")
  .post(userRegistrationValidator(), validate, registerUser);

router.get("/verify/:token", verifyEmail);

router.post("/login", loginUser)

export default router;
