import { MongoClient } from 'mongodb'; //const {MongoClient} = require('mongodb');
import dotenv from 'dotenv'; //const dotenv = require('dotenv');
dotenv.config(); //dotenv.config({ path: '.env' });
const databaseURI = process.env.ATLAS_URI;
console.log(databaseURI);
const client = new MongoClient(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _database;

export default {
  connectToServer: function (callback) {
    client.connect(function (error, database) {
      if (database) {
        _database = database.db('DiscordBot');
        console.log('Successfully connected to MongoDB.');
      }
      return callback(error);
    });
  },

  getDb: function () {
    return _database;
  },
};
// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (error, database) {
//       if (database) {
//         _database = database.db('DiscordBot');
//         console.log('Successfully connected to MongoDB.');
//       }
//       return callback(error);
//     });
//   },

//   getDb: function () {
//     return _database;
//   },
// };
