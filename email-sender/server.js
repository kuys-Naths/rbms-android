const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5001;

app.use(bodyParser.json());

const verificationCodes = {}; // Store verification codes (In-memory)

// Configure your nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rbms.labanos2024@gmail.com', // Your email
    pass: 'gmuwmhckmxdnyaho', // Your email password or an app password
  },
});

// API to send the email with the verification code
app.post('/send-email', (req, res) => {
  const { to, subject } = req.body;

  // Check if 'to' email is provided
  if (!to) {
    return res.status(400).send('Email address is required.');
  }

  // Generate a random 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Store the code temporarily
  verificationCodes[to.toLowerCase()] = code; // Store emails as lowercase to avoid case sensitivity issues

  // Email message options
  const mailOptions = {
    from: 'rbms.labanos2024@gmail.com',
    to: to,
    subject: subject || 'Your Verification Code', // Default subject if none is provided
    text: `Your verification code is: ${code}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Failed to send email to ${to}:`, error);
      return res.status(500).send('Failed to send email.');
    }
    console.log(`Email sent: ${info.response} | Verification code sent to ${to}: ${code}`);
    res.status(200).send('Verification code sent.');
  });
});

// API to verify the code
app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;

  // Debugging logs to check what's being sent
  console.log(`Verifying code for ${email}: received code is ${code}, stored code is ${verificationCodes[email.toLowerCase()]}`);

  // Check if the code matches the stored one
  if (verificationCodes[email.toLowerCase()] && verificationCodes[email.toLowerCase()] === code) {
    delete verificationCodes[email.toLowerCase()]; // Clear the stored code after successful verification
    return res.status(200).send('Code verified successfully.');
  } else {
    return res.status(400).send('Invalid or expired verification code.');
  }
});

// Server listener
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
