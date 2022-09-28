const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define Email options
  const mailOptions = {
    from: 'Bikash Nath <bikash625sf@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  console.log('mailOpt:- ', mailOptions);

  // 3) Send the email
  const res = await transporter.sendMail(mailOptions);
  console.log('mail sent:- ', res);
};

module.exports = sendEmail;
