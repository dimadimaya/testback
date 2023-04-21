const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const {
  joiSignupSchema,
  joiLoginSchema,
  // joiVerifyEmailSchema,
} = require("../../models/user");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.veryfyEmail));

// router.post(
//   "/verify",
//   validation(joiVerifyEmailSchema),
//   ctrlWrapper(ctrl.resendVerifyEmail)
// );

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
