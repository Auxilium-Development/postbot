const fs = require('fs'),
  path = require('path'),
  request = require('snekfetch'),
  {Command} = require('discord.js-commando'),
  {deleteCommandMessages} = require('../../components/util.js');

module.exports = class FileUploadCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'upload',
      memberName: 'upload',
      group: 'files',
      alias: ['publish'],
      description: 'upload a debian package to the Auxilium repository',
      examples: ['upload'],
      guildOnly: false,
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  hasPermission (msg) {
    return this.client.isOwner(msg.author) || msg.member.roles.some(r => r.name === 'Dev');
  }

  run (msg) {
    if (msg.attachments && msg.attachments.first()) {
      if (!(/(deb|tar|png)/i).test(msg.attachments.first().file.name.slice(-3))) {
        return msg.reply('this command requires uploading a file in deb format');
      }

      deleteCommandMessages(msg, this.client);
      request.get(msg.attachments.first().url).pipe(fs.createWriteStream(path.join(__dirname, `../../data/dist/${msg.attachments.first().file.name}`)));

      return msg.reply('file uploaded');
    }

    return msg.reply('please attach the debian package to the message when using this command');
  }
};