import mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (Options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://mailgen.js/",
    },
  });

   const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    })

    const mail = {

      from: "mail.taskmanager@example.com",
      to: Options.email,
      subject: Options.subject,
      text: emailText,
      html: emailHtml 
    

    }

    try{
        await transporter.sendMail(mail)
    }catch(error){
        console.error("Email Failed", error)
    }

  const emailText = mailGenerator.generatePlaintext(Options.mailGenerator);
  const emailBody = mailGenerator.generate(Options.mailGenerator);
};

//factory function
const emailVerificationMailgGenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to App! Please Click Here",
      action: {
        instructions: "To get started our App, please click here:",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgetPasswordMailgGenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset your password",
      action: {
        instructions: "To change your password click button:",
        button: {
          color: "#22BC66",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

