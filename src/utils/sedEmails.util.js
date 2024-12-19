import nodemails from "nodemailer";
import { config } from "../configs/config.js";
import { ServiceError } from "../errors/ServiceError.error.js";
import errorCodes from "./errorCodes.util.js";

const transporter = nodemails.createTransport({
  service: "gmail",
  auth: {
    user: config.companyEmail,
    pass: config.companyPasswordEmail,
  },
});

export const sendEmail = async (email, username, password) => {
  try {
    await transporter.sendMail({
      from: config.companyEmail,
      to: email,
      subject: `Welcome ${username} this is your account`,
      text: `Welcome ${username} this is your account, your temporal password is is ${password}`,
    });

  } catch (e) {
    throw new ServiceError(
      e.message || "Error sending email",
      e.code || errorCodes.EMAIL.ERROR_SENDING_EMAIL
    );
  }
};
