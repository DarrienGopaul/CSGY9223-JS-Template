import {
  Client,
  Collection,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js';
import { config } from 'dotenv';

import dbo from './src/server/db/conn.js';
import path from 'node:path';
import fs from 'node:fs';

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

//dynamic import of commands
client.commands = new Collection();
const foldersPath = path.join(path.resolve(), 'commands');
const commandFolders = fs.readdirSync(foldersPath);
console.log(foldersPath, commandFolders);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);

    import(filePath).then(command => {
      console.log(`Loaded command ${file}`);
      console.log(command.default);
      if ('data' in command.default && 'execute' in command.default) {
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        client.commands.set(command.default.data.name, command.default);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    });
  }
}
// const commands = [
//   // define slash commands
//   ping.data,
//   echo.data,
// ];

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
      body: client.commands.toJSON(),
    });
    client.login(TOKEN);
  } catch (error) {
    console.error(error);
  }
}

await main();
