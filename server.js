var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.send('Welcome to the slackbot "community" for [data against covid-19](https://app.slack.com/client/TUQTGE7FU)')
});

app.post('/',function(req,res){

  let answer = ""
  let commands = require('./commands.json');
  //"Ce service vous aidera à orienter correctement votre action sur ce slack.\nVous pouvez poser certaines questions à ce robot et ce dernier vous aidera à obtenir la bonne réponse.\nPour obtenir la liste des questions que vous pouvez poser, utilisez la commande 'aide' de cette manière : \n```/community aide```"

  
  //TODO
  // Adapt code to search messages/ dir and not in commands object
  if (req.body.text == "") {
      answer = require('./messages/_.json');
  } else if (req.body.text.toLowerCase() == "aide") {
      answer = require('./messages/aide.json');
      answer += answer["blocks"][1]["text"]["text"]
      for (let key in commands) {
        answer += '- ' + key + '\n'
      }
      answer += answer["blocks"][3]["text"]["text"]
  } else if (commands[req.body.text.toLowerCase()]) {
      answer = commands[req.body.text.toLowerCase()]
  } else {
      answer = require('./messages/unknown_command_error.json');
  }

  res.send(answer)

});

port = process.env.PORT || 8000
app.listen(port,function(){
  console.log("Started on PORT 8000");
})
