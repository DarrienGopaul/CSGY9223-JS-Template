import { SlashCommandBuilder } from '@discordjs/builders';

export default {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription(
      'For testing purposes, prints some user data. In the future will add a User to queue'
    ),
  async execute(interaction) {
    console.log(interaction);
    await interaction.reply(`${interaction.user.username} from queue.js!`);
  },
};
