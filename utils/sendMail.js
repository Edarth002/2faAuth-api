import { createTransport } from "nodemailer";

async function sendMail(to, subject, text, html) {
  try {
    const transporter = createTransport({
      service: "gmail", // or your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"2FA Security" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return true;
  } catch (err) {
    console.error("Error sending email:", err);
    return false;
  }
}

export default sendMail;
