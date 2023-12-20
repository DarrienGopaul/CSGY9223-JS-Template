import path from 'node:path';
import fs from 'node:fs';
import { Collection } from 'discord.js';

//dynamic import of commands
const all_commands = new Collection();
const foldersPath = path.join(path.resolve(), 'commands/utils');
const commandFolders = fs.readdirSync(foldersPath);

console.log(`Loading commands from ${commandFolders}`);

for (const commnadFilename of commandFolders) {
  const filePath = path.join(foldersPath, commnadFilename);

  await import(filePath).then(command => {
    //console.log(`Loaded command ${commnadFilename}`);
    //console.log(command.default);
    if ('data' in command.default && 'execute' in command.default) {
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      all_commands.set(command.default.data.name, command.default);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  });
}
console.log(`Loaded ${all_commands.size} commands`);

export default all_commands;
