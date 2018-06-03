const fs = require('fs'),
  path = require('path'),
  shell = require('child_process'),
  {Command} = require('discord.js-commando'),
  {deleteCommandMessages} = require('../../components/util.js');

module.exports = class FileUploadCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'copy',
      memberName: 'copy',
      group: 'files',
      description: 'trial',
      guildOnly: false,
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  run (msg) {
    shell.spawn('sh', [path.join(__dirname, '../../data/copy.sh')], {stdio: 'inherit'});
  }
};