import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail({ to, otp }: { to: string; otp: string }) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "🔐 Your OTP Code - ExecFleet Login",
    html: getOtpHtmlTemplate(otp),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent to:", to);
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error);
  }
}

function getOtpHtmlTemplate(otp: string) {
  return `
    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px; border-radius: 8px;">
      <h2 style="text-align: center; color: #2e7d32;">ExecFleet Login Verification</h2>
      <p>Hello,</p>
      <p>Use the OTP below to complete your login process:</p>
      <div style="text-align: center; margin: 24px 0;">
        <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; background-color: #e8f5e9; padding: 16px 32px; border-radius: 8px; display: inline-block; color: #2e7d32;">
          ${otp}
        </span>
      </div>
      <p>This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
      <p style="margin-top: 40px;">Regards,<br/>ExecFleet Team</p>
    </div>
  `;
}
