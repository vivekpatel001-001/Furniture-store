// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendTestEmail = async () => {
//   try {
//     const info = await transporter.sendMail({
//       from: '"My Shop" <shop@example.com>', // sender address
//       to: "receiver@example.com", // receiver
//       subject: "Welcome to My Shop!",
//       text: "Thanks for signing up!",
//       html: "<b>Thanks for signing up!</b>", // HTML version
//     });

//     console.log("Email sent:", info.messageId);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };
