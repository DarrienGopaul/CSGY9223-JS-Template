# Discord Queue Handling Chatbot

This project was generated from a JavaScript template repository that provides a basic structure for starting a new JavaScript project. It includes configuration for testing with Jest, linting with ESLint and Prettier, and a GitHub Actions workflow for automatically running tests on every pull request. Yarn is the package manager used for managing dependencies in this template.

The purpose of the Discord Queue Handling Chatbot is to automate the process of choosing members to participate in MMORPG (multiplayer online role-playing game) events of varying types (different games and player role) and sizes (tournament versus casual game). With this ChatBot, a user can create event cards, posts containing important information about a game event, and share it with groups across the Discord server. Members of these groups can join the event under different MMORPG player roles types and be added to a role-classified event queue. Shortly before an event begins, the event organizer can create an event party, consisting of participants who joined the event queue, selected by the role and order in which they joined. This facilitates an unbiased selection system.

## Contributions

* DarrienGopaul: Scaffolded the Discord.js project structure, register and create Discord Bot account and server.
* d-santiago: Created MongoDB database and JSON collection schemas. Developed Express.js /server and /routes endpoints.
* jeffzhkw: Refractor Discord.js project to support iterative development. Integrated with MongoDB server endpoints. 
* Thaileaf: Simplified developer environment for contributing with `setup.sh` script, focused on code reviews. 


## Getting Started


1. Clone the current repository to your local machine:

   ```bash
   git clone https://github.com/DarrienGopaul/CSGY9223-JS-Template.git
   ```

2. Navigate to the cloned repository:

   ```bash
   cd CSGY9223-JS-Template
   ```

3. Create `.env` files under project root directory and in `src/server` directory.

   Modity the content of `.env` files by filling in your Discord token and MongoDB key according to the report submitted on BrightSpace.

   ```bash
   cd CSGY9223-JS-Template
   touch .env 
   vim .env
   cd src/server
   touch .env
   vim .env
   ```

4. Under project root directoray, install project dependencies using: 

   ``` bash
   cd CSGY9223-JS-Template
   yarn install
   npm install
   ```

5. Install additional dependencies for MongoDB using: 

   ```bash
   cd src/server
   npm install
   ```

6. Under project root directory, start DiscordBot server using 
   ```bash
   cd CSGY9223-JS-Template
   node index.js
   ```
   
7. Open a new terminal under `src/server` directory, start MongoDB server using:
   ```bash
   cd src/server
   npm start
   ```

​	Make sure no program is running at `Port 5000` on your local machine

Note: the project is still work in progress, and all responses from Discord bot are right  from MongoDB endpoints.

## Testing

This template includes Jest for testing your JavaScript code. Test files should be placed under the `src/__tests__` directory. You can run tests using the following command:

```bash
cd src/server
yarn test
```

Jest will automatically discover and run all test files under `src/__tests__`.


## Linting

This template uses ESLint and Prettier for code linting and formatting. It also includes the `eslint-plugin-unicorn` for additional linting rules. You can check and fix linting issues using the following commands:

To check for linting issues:

```bash
yarn lint
```

## GitHub Actions

A GitHub Actions workflow is included in this template that runs the tests on every pull request. You don't need to configure anything for this to work; it's set up to run automatically.


## Functional Requirements

Key Terms: Server, Event, Queue, Leader, Participant, Role, Party, Pull, ChatBot.

* A Leader can create new events in a Discord server.

* An event has one Leader, one Party, and multiple Participants.

* A Participant is a Member of a Discord server who joins an event.

   * By default, a Leader is a Participant of its own event.

* The pull (selection) process of Participants for an event is governed by the First In First Out (FIFO) principle.

   * A queue has a certain capacity for each player role, however an unlimited number of Members can join the queue.

* A Member can join events and are added to the event queue as a Participant.

   * Upon joining an event queue, a Participant is notified by the ChatBot of their queue position and the queue’s capacity.

* A Participant can leave events and are removed from the event queue.

   * Upon leaving an event, the participant is notified by the Discord ChatBot.

   * When a participant is removed from a queue, every Participant’s queue position behind the removed participant is updated by

* A Participant can request their private queue information for a certain event at any time. This information is delivered by the ChatBot.

   * Queue role and position.

   * Player roles.

   * Queue capacity per player role.

* A Participant or Leader can request public queue information for a certain event.

   * Total number of people in the queue, classified by role.

   * Queue capacity per player role.

* A Leader can pull Participants from the event queue to form a party for their event.

   * Upon being pulled into an event from the event queue, the Participant and Leader is notified by the Discord ChatBot.

   * If a Participant does not confirm their party invitation within a set amount of time, they will be ejected from the party.

* The Participant and Leader is notified of the ejection by the Discord ChatBot.

* Members are alerted by the Discord ChatBot before an event begins on certain time intervals (days, hours, minutes).

* A Leader can cancel events.

   * The Participant and Leader is notified of the event cancellation by the Discord ChatBot.

## Technical Specifications

* Programming Languages:

   * Javascript: Used with Node.js and Express.js frameworks to create an application server that handles requests to and from the Discord API.

* Frameworks and Libraries:
  
   * Node.js: A runtime environment that allows the use of Javascript on the server side. Due to the heavy use of network communication with the Discord API, it makes use of Node’s non-blocking I/O model.

   * Express.js: Adds extra functionality to Node.js for building web applications.

* Database Technologies:

   * MongoDB (NoSQL): Stores the Discord events and participant queues.
   
* APIs and External Services: Mention any external APIs or services that will be integrated.

   * Discord API:


## Server Endpoints

      Leader Endpoints:
    
      POST     /leader/createEvent
               A leader can create new events in a Discord server.
    
      DELETE   /leader/cancelEvent
               A leader can cancel events in a Discord server.
    
      GET      /leader/getEventInfo
               A participant can request the queue information for their event.
    
      PUT      /leader/changeEventName
               A leader can change the name of their event
    
      PUT      /leader/changeEventDescription
               A leader can change the description for their event
    
      POST     /leader/changeEventStart
               A leader can change the start time for their event
    
      POST     /leader/changeEventEnd
               A leader can change the end time for their event
    
      PUT      /leader/addEventRole
               A leader can add a role to their event
    
      PUT      /leader/removeEventRole
               A leader can add a role to their event
    
      PUT      /leader/changeEventRoleCapacity
               A leader can change the event role capacity for their event
    
      PUT      /leader/createEventParty
               A leader can pull Participants from the event queue to form a party for their event.
    
      Participant Endpoints:
    
      PUT      /participant/joinEvent
               A member of the Discord server can join events as a participant.
    
      PUT      /participant/leaveEvent
               A participant can leave events and are removed from the event queue.
    
      GET      /participant/getEventInfo
               A participant can request their queue information for a certain event at any time.



## Getting Started(Deprecated)
1. Edit the `setup.sh` script, replace the environment variables accordingly as shown below. These can be found in the report. 

   ```bash
   echo "ATLAS_URI=__your_connection_string__" >> .env
	echo "DISCORD_TOKEN=__your_discord_token__" >> .env
	echo "GUILD_ID=__your_discord_server_id__" >> .env
	echo "CLIENT_ID=__your_discord_client_id__" >> .env
   echo "PORT=5000" >> .env
   ```


2. Install project dependencies using setup script:

   ```bash
   ./setup.sh
   ```

3. Fill in your Discord token and MongoDB key

4. Start adding your JavaScript code to the `src` directory. You can create new files and modules under the `src` directory as needed.

5. To expose your modules, update the `index.js` file in the root directory. For example:

   ```javascript
   import * as hello from './src/hello.js';
   import * as yourNewModule from './src/yourNewModule.js'
   
   export default {
     hello,
     yourNewModule
   };
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
