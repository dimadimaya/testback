const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { sendEmail } = require("../../helpers");
const { v4 } = require("uuid");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const token = v4();
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    token,
  });
  const mail = {
    to: email,
    subject: "confirm registration",
    html: `<a href="http://localhost:3000/api/auth/verify/"${token} target="_blank">click to confirm registration</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription: result.subscription,
      },
    },
  });
};

module.exports = signup;
