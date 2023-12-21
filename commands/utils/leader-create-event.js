import { SlashCommandBuilder } from '@discordjs/builders';

export default {
  data: new SlashCommandBuilder()
    .setName('create_event')
    .setDescription('Create event')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('The name of the event')
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName('admin_id')
        .setDescription('The admin_id of the event')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('description')
        .setDescription('The description of the event')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('start')
        .setDescription('The start date of the event in format "yyyy-mm-dd"')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('end')
        .setDescription('The end date of the event in format "yyyy-mm-dd"')
        .setRequired(true)
    )
    .toJSON(),
  async execute(interaction) {
    const response = await fetch('http://127.0.0.1:5000/leader/createEvent', {
      method: 'POST',
      body: JSON.stringify({
        admin_id: interaction.options.getNumber('admin_id'),
        name: interaction.options.getString('name'),
        description: interaction.options.getString('description'),
        start: interaction.options.getString('start'),
        end: interaction.options.getString('end'),
        roles: ['Tank', 'Healer', 'DPS'],
        role_capacity: {
          Tank: 1,
          Healer: 2,
          DPS: 3,
        },
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const { acknowledged, insertedId } = await response.json();

    await interaction.reply(
      `${acknowledged} ${insertedId} from leader-create-event.js!`
    );
  },
};
