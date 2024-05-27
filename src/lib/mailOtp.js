import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service:"gmail",
  secure:true,
  port: 465,
  auth: {
      user: 'utkarshanal2016@gmail.com',
      pass: 'mjwlgurwjyiuedgj'
  }
});

  async function MailOTP(email,otp) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Rentify " utkarshanal2016@gmail.com', // sender address
      to: email, // list of receivers
      subject: "OTP ✔", // Subject line
      html: `<b>OTP is ${otp}</b>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  export default MailOTP