import {
  emailValidation,
  nameValidation,
  messageValidation,
  checkboxValidation,
} from "../../utils/formValidationRules";

const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.SENDGRID_API);

export default async function sendMail(req, res) {
  const { body, method } = req;
  const { email, fullName, message, consent, captcha } = JSON.parse(body);
  const emailMessage = `
    FullName: ${fullName}\r\n
    Email: ${email}\r\n
    Message: ${message}
  `;
  const data = {
    to: "ihctuh@gmail.com",
    from: "form@beadvme.com",
    subject: "New web form message!",
    text: emailMessage,
    html: emailMessage.replace(/\r\n/g, "<br>"),
  };
  if (method === "POST") {
    if (
      !captcha ||
      messageValidation(message)
    ) {
      return res.status(422).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }
    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();
      if (captchaValidation.success) {
        await mail.send(data);
        return res.status(200).send("OK");
      }
      return res.status(422).json({
        message: "Unproccesable request, Invalid captcha code",
      });
    } catch (error) {
      return res.status(422).json({ message: "Something went wrong" });
    }
  }
  return res.status(404).send("Not found");
}
