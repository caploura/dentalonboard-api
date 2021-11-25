const express = require("express");
const router = express.Router();

const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const emailFunctions = require("../functions/email");
const config = require("../config/config");

const oauth2Client = new google.auth.OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  config.REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: config.REFRESH_TOKEN });

router.post("/email", (req, res, next) => {
  const emailContents = req.body;
  const mailOptions = {
    from: `DOB Site <${config.EMAIL}>`,
    to: config.EMAIL,
    replyTo: emailContents.email,
    subject: "A new message was submitted on the DOB website",
    text: "",
    html: emailFunctions(
      emailContents.firstName,
      emailContents.lastName,
      emailContents.subject,
      emailContents.message,
      emailContents.email
    ),
  };

  sendEmail(mailOptions)
    .then((result) => console.log(`Email sent, msg: ${JSON.stringify(result)}`))
    .catch((error) => console.log(error));

  res.sendStatus(200);
});

router.get("/test", (req, res, next) => {
  res.sendStatus(200);
});

async function sendEmail(mailOptions) {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.EMAIL,
        clientId: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        refreshToken: config.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const result = await transport.sendMail(mailOptions);

    return result;
  } catch (error) {
    return error;
  }
}

module.exports = router;
