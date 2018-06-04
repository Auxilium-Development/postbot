const {Command} = require('discord.js-commando'), 
  {oneLine, stripIndents} = require('common-tags'), 
  {deleteCommandMessages} = require('../../components/util.js');

module.exports = class AlertCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'alert',
      memberName: 'alert',
      group: 'snippets',
      alias: ['devalert'],
      description: 'Objective C Sample code for alerts',
      guildOnly: false,
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  run (msg) {
    deleteCommandMessages(msg, this.client);

    return msg.say(`${oneLine`An object that displays an alert message to the user`}

    __Usage example:__
    \`\`\`objc
UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Alert Title"
    message:@"Alert message"
    preferredStyle:UIAlertControllerStyleAlert];

UIAlertAction *defaultAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault
    handler:^(UIAlertAction *action) {}];

[alert addAction:defaultAction];
[self presentViewController:alert animated:YES completion:nil];
\`\`\`

${stripIndents`**Apple documentation**
https://developer.apple.com/documentation/uikit/uialertcontroller?language=objc

**iPhoneDevWik documentation**
http://iphonedevwiki.net/index.php/UIAlertController
`}
    `);
  }
};