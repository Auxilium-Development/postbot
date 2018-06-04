const fs = require('fs'),
  path = require('path'),
  request = require('snekfetch'),
  shell = require('child_process'),
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

  async run (msg) {
    if (msg.attachments && msg.attachments.first()) {
      if (!(/(deb|tar|png)/i).test(msg.attachments.first().file.name.slice(-3))) {
        return msg.reply('this command requires uploading a file in deb format');
      }

      request.get(msg.attachments.first().url).pipe(fs.createWriteStream(path.join(__dirname, `../../data/dist/${msg.attachments.first().file.name}`)));

      const statusMsg = await msg.reply('file queued for uploading');

      fs.renameSync(path.join(__dirname, `../../data/dist/${msg.attachments.first().file.name}`), `/var/www/repo/debs/${msg.attachments.first().file.name}`);
      require('simple-git')('/var/www/repo') // eslint-disable-line global-require
        .add(`debs/${msg.attachments.first().file.name}`)
        .commit(`Committing ${msg.attachments.first().file.name}`)
        .push('origin', 'gh-pages');

      shell.spawn('sh', ['/var/www/repo/run.sh'], {stdio: 'inherit'});

      deleteCommandMessages(msg, this.client);

      return statusMsg.edit('file has been published');
    }

    return msg.reply('please attach the debian package to the message when using this command');
  }
};