const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSubscriptionSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/subscription",
  auth,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
