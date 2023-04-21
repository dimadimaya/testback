const { User } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");
// const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("Not found");
  }
  // if (user.verify) {
  //   throw new BadRequest("Verification has already been passed");
  // }
  // const mail = {
  //   to: email,
  //   subject: "confirm registration",
  //   html: `<a href="http://localhost:3000/api/auth/verify/"${user.verificationToken} target="_blank">click to confirm registration</a>`,
  // };
  // await sendEmail(mail);
  // res.json({
  //   email,
  // });
};

module.exports = resendVerifyEmail;
