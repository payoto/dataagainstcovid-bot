var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.end('Welcome to the slackbot "community" for "data against covid-19" https://app.slack.com/client/TUQTGE7FU')
});

app.post('/',function(req,res){

  let answer = ""
  let commands = require('./commands.json');

  if (req.body.text == "") {
      answer = "Ce service vous aidera a orienter correctement votre action sur ce slack"
  } else if (req.body.text == "aide") {
      answer = JSON.stringify(Object.keys(dictionary));
  } else if (commands[req.body.text]) {
      answer = commands[req.body.text]
  } else {
      answer = 'Commande inconnue. Utilisez le mot-clé "aide" pour plus d\'information.'
  }

  res.end(answer)

});

port = process.env.PORT || 8000
app.listen(port,function(){
  console.log("Started on PORT 8000");
})
