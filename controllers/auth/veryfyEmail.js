const { User } = require("../../models");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res) => {
  const { verifivationToken } = req.params;
  const user = await User.findOne({ verifivationToken });
  if (!user) {
    throw new NotFound("User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verifivationToken: "",
  });
  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
