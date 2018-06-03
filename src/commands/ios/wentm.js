const path = require('path'),
  {Command} = require('discord.js-commando'), 
  {deleteCommandMessages} = require('../../components/util.js');

module.exports = class WentmCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'wentm',
      memberName: 'wentm',
      group: 'ios',
      aliases: ['weneta', 'wen'],
      description: 'YEEEETTTTTT',
      guildOnly: false,
      patterns: [/(?!.*went.*|wend.*|wench.*|wed.*|rowen.*|twent.*)(wen|weneta|wen eta)/im],
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  run (msg) {
    let body = 's0n';

    if (/(weneta|wen eta)/i.test(msg.content.slice(msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix))) {
      body = 'eta s0n';
    }

    deleteCommandMessages(msg, this.client);
    
    return msg.reply(body, {files: [path.join(__dirname, '../../data/yeet.jpg')]});
  }
};