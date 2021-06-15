var express = require("express");
var app = express();
var path = require("path");

//Importing body-parser middleware to parse our form data.
var bodyParser = require("body-parser");
//Importing nodemailer library
var nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routing our form
app.use(express.static(path.join(__dirname, "public")));

//This route will capture the form details and send it to your personal mail id
app.post("/sendemail", (req, res, next) => {
  console.log(req.body);

  //Transporter service is used by nodemailer to send emails , it takes service and auth object as a parameter.
  //we are using Gmail  service.
  //In auth object we specify our mail id and password.(from which we have to send mail)
  var transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "your mail id here", // add your mail here
      pass: "your password", // add your password here
    },
  });

  //In mailOptions we specify from and to Ids and some html content which we want to send.
  // html is our form details which we parse using bodyparser.

  var mailOptions = {
    from: "Your mail id",
    to: `${req.body.email}`,
    subject: `Hey ${req.body.name}!`,
    html: `<h1>Contact Details</h1> 
        <h2>Name:${req.body.name}</h2>
        <h2>Gender:${req.body.gender}</h2>
        <h2>Email:${req.body.email}</h2>
        <h2>Phone Number:${req.body.phonenumber}</h2>
        <h2>Message:${req.body.message}</h2><br>`,
  };

  //IMPORTANT PART : sendMail is a method which actually sends email, it takes mailOptions and callback function as a parameter.

  transporter.sendMail(mailOptions, (error, info) => {
    //If some error occured
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log("email is Sent!" + info.response);
      res.send("sent Successfully!!");
    }
  });
});
app.listen(1200, () => console.log("server started..."));
