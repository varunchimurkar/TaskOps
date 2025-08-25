import { asyncHandler } from "../utils/async-handler.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import { User } from "../models/user.models.js";
import { sendMail, emailVerificationMailgGenContent } from "../utils/mail.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, fullname } = req.body;

  if (!email || !username || !password || !fullname) {
    return res.status(400).json({
      success: false,
      message: "All field are required",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User Already exists",
    });
  }

  const user = await User.create({
    email,
    username,
    password,
    fullname,
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not registered",
    });
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.emailVerificationToken = token;

  await user.save();

  const verificationUrl = `${process.env.BASE_URL}/api/v1/users/verify/${token}`;

  const mailContent = emailVerificationMailgGenContent(
    user.username,
    verificationUrl,
  );

  await sendMail({
    email: user.email,
    subject: "Verify your email",
    mailGenerator: mailContent,
  });

  res.status(201).json({
    success: true,
    message:
      "User registered successfully. Please check your email to verify your account.",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      fullname: user.fullname,
    },
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    res.status(400).json({
      message: "Invalid Token",
    });
  }

  try {
    const user = await User.findOne({
      emailVerificationToken: token,
    });

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.status(200).json({
      message: "Email verified successfully ✅",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "Email not verified",
      error,
      success: false,
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    res.status(400).json({
      message: "All field required",
    });
  }

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(400).json({
        message: "Invalid Email or username or Password",
      });
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
      });
    }

   const accessToken = user.generateAccessToken()
   const refreshToken = user.generateRefreshToken()


   user.refreshToken = refreshToken
   await user.save()

   res.status(200).json({
    message : "Login Successful ✅",
    success : true,
    accessToken,
    refreshToken
   })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const resendEmailVerification = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const resetForgottenPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

export {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgottenPassword,
  verifyEmail,
};
