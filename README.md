# Discord Queue Handling Chatbot

This project was generated from a JavaScript template repository that provides a basic structure for starting a new JavaScript project. It includes configuration for testing with Jest, linting with ESLint and Prettier, and a GitHub Actions workflow for automatically running tests on every pull request. Yarn is the package manager used for managing dependencies in this template.

The purpose of the Discord Queue Handling Chatbot is to automate the process of choosing members to participate in MMORPG (multiplayer online role-playing game) events of varying types (different games and player role) and sizes (tournament versus casual game). With this ChatBot, a user can create event cards, posts containing important information about a game event, and share it with groups across the Discord server. Members of these groups can join the event under different MMORPG player roles types and be added to a role-classified event queue. Shortly before an event begins, the event organizer can create an event party, consisting of participants who joined the event queue, selected by the role and order in which they joined. This facilitates an unbiased selection system.

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

## Getting Started

To use this template repository for your own project, follow these steps:

1. Clone your new repository to your local machine:

   ```bash
   git clone https://github.com/your-username/your-new-repo.git
   ```

1. Navigate to the cloned repository:

   ```bash
   cd your-new-repo
   ```

2. Install project dependencies using setup script:

   ```bash
   ./setup.sh
   ```

4. Fill in your Discord token and MongoDB key

5. Start adding your JavaScript code to the `src` directory. You can create new files and modules under the `src` directory as needed.

6. To expose your modules, update the `index.js` file in the root directory. For example:

   ```javascript
   import * as hello from './src/hello.js';
   import * as yourNewModule from './src/yourNewModule.js'

   export default {
     hello,
     yourNewModule
   };
   ```

## Testing

This template includes Jest for testing your JavaScript code. Test files should be placed under the `src/__tests__` directory. You can run tests using the following command:

```bash
yarn test
```

Jest will automatically discover and run all test files under `src/__tests__`.

## Linting

This template uses ESLint and Prettier for code linting and formatting. It also includes the `eslint-plugin-unicorn` for additional linting rules. You can check and fix linting issues using the following commands:

To check for linting issues:

```bash
yarn lint
```

To automatically fix some of the linting issues:

```bash
yarn lint:fix
```

## GitHub Actions

A GitHub Actions workflow is included in this template that runs the tests on every pull request. You don't need to configure anything for this to work; it's set up to run automatically.

## To Start MongoDB Server

### Server

```
cd /src/server
npm start server
```

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


## Contributions

* DarrienGopaul:
* d-santiago: MongoDB Administrator and Backend Developer (Server and Routes)
* jeffzhkw:
* Thaileaf:

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
