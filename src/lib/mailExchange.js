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

  async function MailExchange(seller,buyer) {

    // console.log({seller, buyer})
    
    await transporter.sendMail({
      from: '"Rentify " utkarshanal2016@gmail.com', // sender address
      to: seller.email, // list of receivers
      subject: "Buyer information ", // Subject line
      html: `
      <h1>Buyer Information</h1>
      <p><strong>Name:</strong> ${buyer.name}</p>
      <p><strong>Email:</strong> ${buyer.email}</p>
      <p><strong>Mobile Number:</strong> ${buyer.mobileNumber}</p>
    `, // html body
    });
  
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal58.email>

    await transporter.sendMail({
      from: '"Rentify " utkarshanal2016@gmail.com', // sender address
      to: buyer.email, // list of receivers
      subject: "Seller information ", // Subject line
      html: `
      <h1>Seller Information</h1>
      <p><strong>Name:</strong> ${seller.firstName} ${seller.lastName}</p>
      <p><strong>Email:</strong> ${seller.email}</p>
      <p><strong>Mobile Number:</strong> ${seller.mobileNumber}</p>
    `, // html body
    });
  }

  export default MailExchange