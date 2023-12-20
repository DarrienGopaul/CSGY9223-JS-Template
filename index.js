import {
  Client,
  SlashCommandBuilder,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js';
import { config } from 'dotenv';
import dbo from './src/server/db/conn.js';

config();

const TOKEN = process.env.DISCORD_TOKEN; // Discord Bot token obtained from Discord Developer Portal
const GUILD_ID = process.env.GUILD_ID; // ID of the server where this bot will be used
const CLIENT_ID = process.env.CLIENT_ID; // Client ID obtained from Discord Developer Portal
const port = process.env.PORT || 5000;

const echo_command = new SlashCommandBuilder()
  .setName('echo')
  .setDescription('Replies with your input!')
  .addStringOption(option =>
    option
      .setName('input')
      .setDescription('The input to echo back')
      .setRequired(true)
  );
console.log(echo_command);

// TODO: should be refactored into a separate file
// client.commands = new Collection(); //  extends JavaScript's native Map class. Used to store and retrieve commands for execution efficiently.
const commands = [
  // define slash commands
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'temp',
    description: 'temp test',
  },
  echo_command,
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

const client = new Client({
  // declare intents that the bot(client) would need to access
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  // everything that happens when the bot is booted up
  // dbo.connectToServer(function (error) {
  //   if (error) console.error(error);
  // });
  console.log(`Server is running on port: ${port}`);
  console.log(`Bot has logged in as ${client.user.username}`);
});

client.on('interactionCreate', async interaction => {
  console.log(interaction);
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    // defines the action to take when user enters /ping
    await interaction.reply('Pong!');
  }

  if (interaction.commandName === 'temp') {
    await interaction.reply('temp!');
  }

  if (interaction.commandName === 'echo') {
    const input = interaction.options.getString('input');
    await interaction.reply(input);
  }
});

async function main() {
  try {
    console.log('Starting (/) commands refresh');
    await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    client.login(TOKEN);
  } catch (error) {
    console.error(error);
  }
}

await main();
