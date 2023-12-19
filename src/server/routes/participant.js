import express from 'express';

// participantRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will
// take control of requests starting with path /participant.

const participantRoutes = express.Router();

// Assists in connecting to the database
import dbo from '../db/conn.js'; //const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from 'mongodb'; //const ObjectId = require('mongodb').ObjectId;

participantRoutes
  .route('/participant/joinEvent')
  .put(function (request, response) {
    console.log(request.body);

    const databaseConnect = dbo.getDb();
    const query = { _id: ObjectId(request.body.event_id) };

    const update = {
      $addToSet: {
        queue: {
          user_id: ObjectId(request.body.user_id),
          role: request.body.role,
          date: new Date(),
        },
      },
      $inc: {
        [`role_size.${request.body.role}`]: 1,
        total_size: 1,
      },
    };
    databaseConnect
      .collection('Events')
      .findOneAndUpdate(query, update, function (error, result) {
        if (error) throw error;
        response.json(result);
      });
  });

participantRoutes
  .route('/participant/leaveEvent')
  .put(function (request, response) {
    console.log(request.body);

    const databaseConnect = dbo.getDb();
    const query = { _id: ObjectId(request.body.event_id) };

    const update = {
      $pull: {
        queue: {
          user_id: ObjectId(request.body.user_id),
          role: request.body.role,
        },
      },
      $inc: {
        [`role_size.${request.body.role}`]: -1,
        total_size: -1,
      },
    };
    databaseConnect
      .collection('Events')
      .findOneAndUpdate(query, update, function (error, result) {
        if (error) throw error;
        response.json(result);
      });
  });

participantRoutes
  .route('/participant/getEventInfo')
  .get(function (request, response) {
    console.log(request.body);

    const databaseConnect = dbo.getDb();
    const query = { _id: ObjectId(request.body.event_id) };
    databaseConnect
      .collection('Events')
      .findOne(query, function (error, result) {
        if (error) throw error;
        response.json(result);
      });
  });

export default participantRoutes; //module.exports = participantRoutes;
