const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')
const cred = require('./credintial.json');

const app = express();

const path = require('path')
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: cred.auth.user, // generated ethereal user
    pass: cred.auth.pass, // generated ethereal password
  },
});

app.post('/mail',(req, res, next) => {``
  var email = req.body.email
  var name = req.body.name
  var contact = req.body.contact
  var agree = req.body.agree


  const mailOptions = {
    form: cred.auth.user,
    name: name,
    email: email,
    contact: contact,
    agree: agree,
    html: `${name} from ${email} <noreply@${cred.auth.user}.com <br /> ${contact}`
  }
  transporter.sendMail(mailOptions, (err, data) =>{
    if (err){
      res.json({
        status:err
      })
      console.log(err)
    } else{
      res.json({
        status: 'success'
      })
      console.log("Email sent" + data.response)
    }
  } )


})

transporter.verify(function(err, success){
  if(err){
    console.log(err)

  }else{
    console.log('server is rady')
  }
})

const PORT =process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })