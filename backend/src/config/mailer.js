// import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT) || 2525,
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

transporter
  .verify()
  .then(() => console.log("SMTP ready"))
  .catch((err) => console.error("SMTP verify failed", err));
  
export const sendMail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Freelance Students" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Email envoyé : ", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Erreur envoi mail :", error);
    throw error;
  }
};
