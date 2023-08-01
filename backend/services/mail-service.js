const { createTransport } = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(
   process.env.CLIEND_ID,
   process.env.CLIENT_SECRET
);
OAuth2_client.setCredentials({
   refresh_token: process.env.CLIENT_REFRESH_TOKEN,
});

const SendActivationMail = async (to, link) => {
   const accessToken = OAuth2_client.getAccessToken();

   const transporter = await createTransport({
      service: "gmail",
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_POST,
      secure: false,
      auth: {
         type: "OAuth2",
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASSWORD,
         clientId: process.env.CLIEND_ID,
         clientSecret: process.env.CLIENT_SECRET,
         refreshToken: process.env.CLIENT_REFRESH_TOKEN,
         accessToken: accessToken,
      },
   });

   await transporter.sendMail(
      {
         from: process.env.SMTP_USER, // sender address
         to: to, // list of receivers
         subject: "Для активации вашего аккаунта пройдите по ссылке ниже.", // Subject line
         text: `Активация аккаунта на ${process.env.API_URL}`, // plain text body
         html: `
		<div>
			<h1>Активация аккаунта.</h1>
			<p>Для активации вашиего аккаунта пройдите по ссылке: <a href=${link}>${link}</a></p>
		</div>`, // html body
      },
      (error, success) => {
         if (error) {
            console.log("error: ", error);
         } else {
            console.log("success: ", success);
         }

         transporter.close();
      }
   );
};

module.exports.SendActivationMail = SendActivationMail;
