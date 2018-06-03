/* eslint-disable */
// Load up the discord.js library
const Discord = require("discord.js");
const fs = require('fs');
const https = require('https');
const path = require('path');

var botname = String("AuxBoi");
//var Git = require("nodegit");
/*Git.Clone("https://github.com/nodegit/nodegit", "nodegit").then(function(repository) {
  // Work with the repository object here.
});*/
// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("message", async message => {
/*const sayMessage = args.join(" ");
// Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
message.delete().catch(O_o=>{});
// And we get the bot to say the thing:
message.channel.send(sayMessage);*/
  const full = args[0];
  const commands = String(command)
  var wen = commands + full
    if(wen === "weneta"){
        return message.reply("eta s0n", {
          files: [
            "./yeet.jpg"
          ]
        })
}
  if (command === "wen") {
    return message.reply("s0n", {
      files: [
        "./yeet.jpg"
      ]
    })
  }
  if(command === "!devalert"){
    message.reply("An object that displays an alert message to the user.");
    message.channel.send("__Usage example:__");
    message.channel.send(`
\`\`\`objc
UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Alert Title"
                          message:@"Alert message"
                          preferredStyle:UIAlertControllerStyleAlert];

UIAlertAction *defaultAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault
                              handler:^(UIAlertAction *action) {}];

[alert addAction:defaultAction];
[self presentViewController:alert animated:YES completion:nil];
\`\`\`
`);
    message.channel.send("**Apple documentation**");
    message.channel.send("https://developer.apple.com/documentation/uikit/uialertcontroller?language=objc");
}
  if (command === "!upload") {
    if (msg.attachments && msg.attachments.first()) {
      const file = fs.createWriteStream(path.join(__dirname, `./downloads/${msg.attachments.first().file.name}`)),
        request = https.get(msg.attachments.first().url, (res) => {
          res.pipe(file);
        });
        message.channel.send("running");
    }
  }

});

client.login(config.token);
