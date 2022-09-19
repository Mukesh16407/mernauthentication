const nodemailer = require("nodemailer");
const Token = require("../model/tokenMode")
module.exports  = async (user, mailType) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.mailtrap.io",
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    
    
    const encryptedToken = bcrypt
      .hashSync(user._id.toString(), 10)
      .replaceAll("/", "");
    const token = new Token({
      userid: user._id,
      token: encryptedToken,
    });
    await token.save();

    let emailContent, mailOptions;

    if (mailType === "verifyemail") {
      emailContent = `<div><h1>Please click on the below link to verify your email address</h1> <a href="http://localhost:3000/verifyemail/${encryptedToken}">${encryptedToken}</a>  </div> `;

      mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Verify Email For MERN Auth",
        html: emailContent,
      };
    } else {
      emailContent = `<div><h1>Please click on the below link to reset your password</h1> <a href="http://localhost:3000/resetpassword/${encryptedToken}">${encryptedToken}</a>  </div>`;

      mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Reset password For MERN Auth",
        html: emailContent,
      };
    }

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
