import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import { config } from 'dotenv';
config();

describe('insert', () => {
  let connection;
  let database;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.ATLAS_URI);
    database = await connection.db('DiscordBot');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert an event into the event collection', async () => {
    const events = database.collection('events');

    const mockEvent = {
      admin_id: new ObjectId('657a0e4a0b75c1c94704e421'),
      name: 'Azerothian Rumble: Clash of the Factions',
    };

    await events.insertOne(mockEvent);

    const insertedEvent = await events.findOne({
      admin_id: new ObjectId('657a0e4a0b75c1c94704e421'),
      name: 'Azerothian Rumble: Clash of the Factions',
    });

    expect(insertedEvent.admin_id).toEqual(mockEvent.admin_id);
    expect(insertedEvent.name).toEqual(mockEvent.name);
  });
});
