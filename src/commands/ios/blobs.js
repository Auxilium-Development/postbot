const {Command} = require('discord.js-commando'), 
  {deleteCommandMessages} = require('../../components/util.js');

module.exports = class BlobsCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'blobs',
      memberName: 'blobs',
      group: 'ios',
      alias: ['blub'],
      description: 'Get a link to the TSS Saver website',
      guildOnly: false,
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  run (msg) {
    deleteCommandMessages(msg, this.client);

    return msg.reply('TSS Saver Website: https://tsssaver.1conan.com/');
  }
};