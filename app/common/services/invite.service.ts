import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const sendInvitationEmail = async (email: string) => {
  // Generate a one-time invitation token
  const invitationToken = jwt.sign({ email }, process.env.INVITATION_TOKEN_SECRET!, {
    expiresIn: '7d', // Token valid for 7 days
  });

  // Email transport configuration
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'You are invited to join our platform',
    html: `
      <p>You have been invited to join our platform. Please click the link below to set your password and complete registration:</p>
      <a href="${process.env.CLIENT_URL}/register?token=${invitationToken}">Complete Registration</a>
    `,
  };

  // Send email
  await transporter.sendMail(mailOptions);

  return { message: 'Invitation sent successfully', token: invitationToken };
};
