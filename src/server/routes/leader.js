/** Express router providing artist related routes
 * @module routers/leader
 * @requires express
 */
const express = require('express');

// leaderRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will
// take control of requests starting with path /leader.

/**
 * Express router to mount leader related functions on.
 * @namespace leaderRoutes
 */
const leaderRoutes = express.Router();

// Assists in connecting to the database
const dbo = require('../db/conn');

leaderRoutes.route('/leader/createEvent').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {}
});

leaderRoutes.route('/leader/cancelEvent').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {}
});

leaderRoutes.route('/leader/addEventRole').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {}
});

leaderRoutes.route('/leader/removeEventRole').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {}
});

leaderRoutes.route('/leader/getEventInfo').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {}
});

leaderRoutes.route('/leader/createParty').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {}
});

module.exports = leaderRoutes;