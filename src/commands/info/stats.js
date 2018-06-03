const duration = require('moment-duration-format'), // eslint-disable-line no-unused-vars
  moment = require('moment'),
  process = require('process'),
  speedTest = require('speedtest-net'),
  {Command} = require('discord.js-commando'),
  {MessageEmbed} = require('discord.js'),
  {oneLine} = require('common-tags'),
  {deleteCommandMessages, roundNumber} = require('../../components/util.js');

module.exports = class StatsCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'stats',
      memberName: 'stats',
      group: 'info',
      aliases: ['botinfo', 'info'],
      description: 'Gets statistics about AuxBot',
      examples: ['stats'],
      guildOnly: false,
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  fetchPlatform (plat) {
    switch (plat) {
    case 'win32':
      return 'Windows';
    case 'darwin':
      return 'MacOS';
    default:
      return 'Linux';
    }
  }

  async run (msg) {
    const speed = speedTest({
        maxTime: 5000,
        serverId: 3242
      }),
      statsEmbed = new MessageEmbed();

    statsEmbed
      .setColor(msg.guild ? msg.guild.me.displayHexColor : '#7CFC00')
      .setAuthor('AuxBot Stats', 'https://github.com/Auxilium-Development.png')
      .addField('Guilds', this.client.guilds.size, true)
      .addField('Channels', this.client.channels.size, true)
      .addField('Users', this.client.users.size, true)
      .addField('Owner', this.client.owners[0].tag, true)
      .addField('License', 'ABSE+JB', true)
      .addField('DiscordJS', 'master', true)
      .addField('NodeJS', process.version, true)
      .addField('Platform', this.fetchPlatform(process.platform.toLowerCase()), true)
      .addField('Memory Usage', `${roundNumber(process.memoryUsage().heapUsed / 10485.76) / 100} MB`, true)
      .addField('Source', '[Available on GitHub](https://github.com/Auxilium-Development/postbot)', true)
      .addField('Server', '[Server Invite](https://discord.gg/E9T5gDF)', true)
      .addField('Repo', '[click here](https://repo.auxiliumdev.com/)', true)
      .addField('Uptime', moment.duration(this.client.uptime).format('DD [days], HH [hours and] mm [minutes]'), true)
      .addField('Current server time', moment().format('MMMM Do YYYY [|] HH:mm.ss [UTC]ZZ'), false)
      .addField('\u200b', oneLine`Use the \`${msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix}help\` command to get the list of commands available to you in a DM. 
            The default prefix is \`${this.client.commandPrefix}\`. You can change this with the \`${msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix}prefix\` command. 
            If you ever forget the command prefix, just use \`${this.client.user.tag} prefix\``)
      .setFooter(`AuxBot | ${moment().format('MMMM Do YYYY [at] HH:mm:ss [UTC]Z')}`, 'https://github.com/Auxilium-Development.png');

    deleteCommandMessages(msg, this.client);

    const statMessage = await msg.embed(statsEmbed); // eslint-disable-line one-var

    speed.on('data', (data) => {
      statsEmbed.fields.pop();
      statsEmbed.fields.pop();
      statsEmbed
        .addField('Download Speed', `${roundNumber(data.speeds.download, 2)} Mbps`, true)
        .addField('Upload Speed', `${roundNumber(data.speeds.upload, 2)} Mbps`, true)
        .addField('Current server time', moment().format('MMMM Do YYYY [|] HH:mm.ss [UTC]ZZ'), false)
        .addField('\u200b', oneLine`Use the \`${msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix}help\` command to get the list of commands available to you in a DM. 
      The default prefix is \`${this.client.commandPrefix}\`. You can change this with the \`${msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix}prefix\` command. 
      If you ever forget the command prefix, just use \`${this.client.user.tag} prefix\``);

      statMessage.edit('', {embed: statsEmbed});
    });
  }
};