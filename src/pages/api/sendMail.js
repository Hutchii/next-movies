const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.SENDGRID_API);

export default async function sendMail(req, res) {
  const body = JSON.parse(req.body);
  console.log(body);
  const message = `
    FullName: ${body.fullName}\r\n
    Email: ${body.email}\r\n
    Message: ${body.message}
  `;
  const data = {
    to: "ihctuh@gmail.com",
    from: "form@beadvme.com",
    subject: "New web form message!",
    text: message,
    html: message.replace(/\r\n/g, "<br>"),
  };

  if (!message) {
    try {
      await mail.send(data);
      res.status(200).json({ message: `Email has been sent` });
      console.log(first);
    } catch (error) {
      res.status(500).json({ error: "Error sending email" });
    }
  } else {
    res.status(500).json({ error: "failed to load data" });
  }
}