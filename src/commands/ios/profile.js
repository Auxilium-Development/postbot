const {Command} = require('discord.js-commando'), 
  {stripIndents} = require('common-tags'),
  {deleteCommandMessages} = require('../../components/util.js');

module.exports = class ProfileCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'profile',
      memberName: 'profile',
      group: 'ios',
      alias: ['prof'],
      description: 'Get a link to the tvOS profile for blocking updates',
      guildOnly: false,
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  run (msg) {
    deleteCommandMessages(msg, this.client);

    return msg.reply(stripIndents`To prevent OTA iOS updated download the tvOS beta profile by opening this link in mobile Discord or Safari
    https://cdn.discordapp.com/attachments/355816702002331658/412689441547878401/tvOS11_1.mobileconfig`);
  }
};