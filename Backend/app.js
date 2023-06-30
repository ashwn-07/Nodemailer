    const express = require("express");
    const app = express();

    require("dotenv").config();
    PORT = process.env.PORT;

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    const nodemailer = require("nodemailer");

        app.post("/sendmail", (req, res) => {
   
            let toaddrs = req.body.recipient
        
        let transporter = nodemailer.createTransport(
            {
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // ssl port
            auth: {
                user: process.env.USER, //your Gmail id from which mail is to be send
                pass:  process.env.PASS, // generated app password from gmail
            },
            },
            {
            from: "Aswin S <rsp04907@gmail.com>", //header of the mail
            }
        );
        let message = {
            to:  toaddrs, // Comma separated list of recipients

            // Subject of the message
            subject: "Test email sent using nodemailer",

            // plaintext body
            text: "HI, This is a test email to check nodemailer functionality and use. DO NOT REPLY!!!!!",
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
            console.log(err);
            process.exit(1);
            }

            // console.log("Message sent successfully!");
            // console.log(info);
        });
        res.send('Check your outbox to see the sent mail!')
        });



    app.listen(PORT, () => {
    console.log(`Server running successfully on ${PORT}`);
    });
