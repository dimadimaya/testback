const express = require("express");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const {
  joiAddContactSchema,
  joiFavoriteSchema,
} = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(joiAddContactSchema);

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", auth, validateMiddleware, ctrlWrapper(ctrl.add));

router.put("/:id", validateMiddleware, ctrlWrapper(ctrl.updateById));

router.patch(
  "/:id/favorite",
  validation(joiFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
