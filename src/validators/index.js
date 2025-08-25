import { body } from "express-validator";

export const userRegistrationValidator = () => [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .matches(/^[a-z0-9_]+$/)
    .withMessage(
      "Username must be lowercase letters, numbers, underscores only",
    ),

  body("password").trim().notEmpty().withMessage("Password is required"),

  body("fullname")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty if provided"),
];
