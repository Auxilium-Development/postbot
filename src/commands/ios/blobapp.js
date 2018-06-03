const {Command} = require('discord.js-commando'), 
  {deleteCommandMessages} = require('../../components/util.js');

module.exports = class BlobAppCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'blobapp',
      memberName: 'blobapp',
      group: 'ios',
      alias: ['blubapp'],
      description: 'Download link for TSS Saver Application',
      examples: ['blubapp'],
      guildOnly: false,
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  run (msg) {
    deleteCommandMessages(msg, this.client);

    return msg.reply('TSS Saver App Link: https://repo.nullpixel.uk/depiction/co.dynastic.tsssaver/');
  }
};