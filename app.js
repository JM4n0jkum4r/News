const express= require("express");
const bodyParser=require("body-parser");
const request=require("request");
const { urlencoded } = require("body-parser");
const https=require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
    apiKey: "2a3e4b57dc9b5ee843796a2c4b10789-us13",
    server: "us13"
  });

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
    
});


app.post("/", function(req, res){
    const list_id= "6cbd1f5e5f";

   const subscribingUser = {
    firstName: req.body.fname,
    lastName: req.body.sname,
    email: req.body.email
  };

  async function run() {
    try{
    const response = await mailchimp.lists.addListMember(list_id, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });
    console.log(response);
    res.sendFile(__dirname+"/success.html");
  }
  catch(err){
    console.log(err.status);
    res.sendFile(__dirname+"/failure.html");
  }

  }
  
  run();

});

app.post("/failure.html", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("App is running");
});


// API Key 02a3e4b57dc9b5ee843796a2c4b10789-us13

// Audience ID: 6cbd1f5e5f