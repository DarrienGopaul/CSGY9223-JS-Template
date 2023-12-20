import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import dbo from './src/server/db/conn.js';
import echo from './commands/echo.js';
import ping from './commands/ping.js';

// using .env file to store sensitive information
config();
const TOKEN = process.env.DISCORD_TOKEN; // Discord Bot token obtained from Discord Developer Portal
const GUILD_ID = process.env.GUILD_ID; // ID of the server where this bot will be used
const CLIENT_ID = process.env.CLIENT_ID; // Client ID obtained from Discord Developer Portal
const port = process.env.PORT || 5000;

// TODO: should be refactored into a separate file
const commands = [
  // define slash commands
  ping.data,
  echo.data,
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

// interaction has type: ChatInputCommandInteraction
// https://old.discordjs.dev/#/docs/discord.js/main/class/ChatInputCommandInteraction
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // defines the action to take when user enters /ping
  console.log(interaction);

  if (interaction.commandName === 'ping') {
    await ping.execute(interaction);
  }

  if (interaction.commandName === 'echo') {
    await echo.execute(interaction);
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
