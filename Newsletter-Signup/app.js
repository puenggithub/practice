//jshint esversion:6
//npm run Server to run nodemon

const express = require("express");
const bodyParser = require("body-parser");
const request =  require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
//console.log(firstName, lastName, email );

 var data = {
   members: [
     {
       email_address: email,
       status: "subscribed",
       merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
     }
   ]
 };

var jsonData = JSON.stringify(data);
  var options = {
    url: "https://us3.api.mailchimp.com/3.0/lists/6ad04a1c67",
    method: "POST",
    headers: {
      "Authorization": "glah dc49a201d2e215addcd85d2a7377110c-us3"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode==200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(3000, function() {
        console.log("Server is running on port 3000!");
});

//dc49a201d2e215addcd85d2a7377110c-us3

//6ad04a1c67
