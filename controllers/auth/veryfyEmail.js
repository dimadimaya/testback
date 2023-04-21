const { User } = require("../../models");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token });
  if (!user) {
    throw new NotFound("User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    token: "",
  });
  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
