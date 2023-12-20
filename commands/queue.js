import { SlashCommandBuilder } from '@discordjs/builders';
import { User } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription(
      'For testing purposes, prints some user data. In the future will add a User to queue'
    ),
  async execute(interaction) {
    await interaction.reply(`${User.displayName()} from queue.js!`);
  },
};
