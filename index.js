import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import all_commands from './commands/commands.js';
import dbo from './src/server/db/conn.js';

// using .env file to store sensitive information
config();
const TOKEN = process.env.DISCORD_TOKEN; // Discord Bot token obtained from Discord Developer Portal
const GUILD_ID = process.env.GUILD_ID; // ID of the server where this bot will be used
const CLIENT_ID = process.env.CLIENT_ID; // Client ID obtained from Discord Developer Portal
const port = process.env.PORT || 5000;
const rest = new REST({ version: '10' }).setToken(TOKEN);
const client = new Client({
  // declare intents that the bot(client) would need to access
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = all_commands;

client.on('ready', () => {
  // everything that happens when the bot is booted up
  dbo.connectToServer(function (error) {
    if (error) console.error(error);
  });
  console.log(`Server is running on port: ${port}`);
  console.log(`Bot has logged in as ${client.user.username}`);
});

// interaction has type: ChatInputCommandInteraction
// https://old.discordjs.dev/#/docs/discord.js/main/class/ChatInputCommandInteraction
client.on('interactionCreate', async interaction => {
  // defines the action to take when user enters /ping
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await (interaction.replied || interaction.deferred
      ? interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        })
      : interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        }));
  }
});

async function main() {
  try {
    console.log('Starting (/) commands refresh');
    await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), {
      body: all_commands.map(command => {
        return {
          name: command.data.name,
          description: command.data.description,
          options: command.data.options,
        };
      }),
    });
    client.login(TOKEN);
  } catch (error) {
    console.error(error);
  }
}

await main();
