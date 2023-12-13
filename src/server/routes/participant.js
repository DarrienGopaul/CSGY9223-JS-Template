/** Express router providing artist related routes
 * @module routers/participant
 * @requires express
 */
const express = require('express');

// participantRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will
// take control of requests starting with path /participant.

/**
 * Express router to mount participant related functions on.
 * @namespace participantRoutes
 */
const participantRoutes = express.Router();

// Assists in connecting to the database
const dbo = require('../db/conn');

participantRoutes.route('/participant/joinEvent').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {}
});

participantRoutes.route('/participant/leaveEvent').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {}
});

participantRoutes.route('/participant/getEventInfo').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {}
});

participantRoutes.route('/participant/changeRole').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {}
});

module.exports = participantRoutes;