const express = require('express');

// participantRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will
// take control of requests starting with path /participant.

const participantRoutes = express.Router();

// Assists in connecting to the database
const dbo = require('../db/conn');


// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

participantRoutes.route('/participant/joinEvent').put(function(req, response) {
  console.log(req.body);
  
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.event_id)};

  const update = {
    $push: {
      queue: {user_id: ObjectId(req.body.user_id), role: req.body.role}
    },
    $inc: {
      [`role_size.${req.body.role}`]: 1,
      total_size: 1
    }
  };
  dbConnect.collection('Events')
      .findOneAndUpdate(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

participantRoutes.route('/participant/leaveEvent').put(function(req, response) {
  console.log(req.body);
  
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.event_id)};

  const update = {
    $pull: {
      queue: {user_id: ObjectId(req.body.user_id), role: req.body.role}
    },
    $inc: {
      [`role_size.${req.body.role}`]: -1,
      total_size: -1
    }
  };
  dbConnect.collection('Events')
      .findOneAndUpdate(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

participantRoutes.route('/participant/getEventInfo').get(function(req, response) {
  console.log(req.body);

  const dbConnect = dbo.getDb()
  const query = {_id: ObjectId(req.body.event_id)};
  dbConnect.collection('Events').findOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

module.exports = participantRoutes;