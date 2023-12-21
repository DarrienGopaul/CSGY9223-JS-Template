import express from 'express'; //const express = require('express');

// leaderRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will
// take control of requests starting with path /leader.

const leaderRoutes = express.Router();

// Assists in connecting to the database
import dbo from '../db/conn.js'; //const dbo = require('./db/conn');

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from 'mongodb'; //const ObjectId = require('mongodb').ObjectId;

leaderRoutes.route('/leader/createEvent').post(function (request, response) {
  console.log('in create event' + request.body.admin_id);

  const databaseConnect = dbo.getDb();
  const object = {
    admin_id: ObjectId(request.body.admin_id),
    name: request.body.name,
    description: request.body.description,
    start: new Date(request.body.start),
    end: new Date(request.body.end),
    roles: request.body.roles,
    role_capacity: request.body.role_capacity,
    total_capacity: Object.values(request.body.role_capacity).reduce(
      (total, value) => total + value,
      0
    ),
    role_size: Object.fromEntries(
      Object.entries(request.body.role_capacity).map(([key, value]) => [key, 0])
    ),
    total_size: 0,
    queue: [],
    party: [],
  };
  databaseConnect
    .collection('Events')
    .insertOne(object, function (error, result) {
      if (error) throw error;
      console.log(result);
      response.json(result);
    });
});

leaderRoutes.route('/leader/cancelEvent').delete(function (request, response) {
  console.log(request.body);

  const databaseConnect = dbo.getDb();
  const query = {
    _id: ObjectId(request.body.event_id),
    admin_id: ObjectId(request.body.admin_id),
  };
  databaseConnect
    .collection('Events')
    .deleteOne(query, function (error, result) {
      if (error) throw error;
      response.json(result);
    });
});

leaderRoutes.route('/leader/getEventInfo').get(function (request, response) {
  console.log(request.body);

  const databaseConnect = dbo.getDb();
  const query = {
    _id: ObjectId(request.body.event_id),
    admin_id: ObjectId(request.body.admin_id),
  };
  databaseConnect.collection('Events').findOne(query, function (error, result) {
    if (error) throw error;
    response.json(result);
  });
});

leaderRoutes.route('/leader/changeEventName').put(function (request, response) {
  console.log(request.body);

  const databaseConnect = dbo.getDb();
  const query = {
    _id: ObjectId(request.body.event_id),
    admin_id: ObjectId(request.body.admin_id),
  };
  const update = {
    $set: {
      name: request.body.name,
    },
  };
  databaseConnect
    .collection('Events')
    .findOneAndUpdate(query, update, function (error, result) {
      if (error) throw error;
      response.json(result);
    });
});

leaderRoutes
  .route('/leader/changeEventDescription')
  .put(function (request, response) {
    console.log(request.body);

    const databaseConnect = dbo.getDb();
    const query = {
      _id: ObjectId(request.body.event_id),
      admin_id: ObjectId(request.body.admin_id),
    };
    const update = {
      $set: {
        description: request.body.description,
      },
    };
    databaseConnect
      .collection('Events')
      .findOneAndUpdate(query, update, function (error, result) {
        if (error) throw error;
        response.json(result);
      });
  });

leaderRoutes
  .route('/leader/changeEventStart')
  .post(function (request, response) {
    console.log(request.body);

    const databaseConnect = dbo.getDb();
    const query = {
      _id: ObjectId(request.body.event_id),
      admin_id: ObjectId(request.body.admin_id),
    };
    const update = {
      $set: {
        start: request.body.start,
      },
    };
    databaseConnect
      .collection('Events')
      .findOneAndUpdate(query, update, function (error, result) {
        if (error) throw error;
        response.json(result);
      });
  });

leaderRoutes.route('/leader/changeEventEnd').post(function (request, response) {
  console.log(request.body);

  const databaseConnect = dbo.getDb();
  const query = {
    _id: ObjectId(request.body.event_id),
    admin_id: ObjectId(request.body.admin_id),
  };
  const update = {
    $set: {
      end: request.body.end,
    },
  };
  databaseConnect
    .collection('Events')
    .findOneAndUpdate(query, update, function (error, result) {
      if (error) throw error;
      response.json(result);
    });
});

leaderRoutes.route('/leader/addEventRole').put(function (request, response) {
  console.log(request.body);

  const databaseConnect = dbo.getDb();
  const query = {
    _id: ObjectId(request.body.event_id),
    admin_id: ObjectId(request.body.admin_id),
  };

  const update = {
    $addToSet: {
      roles: request.body.role,
    },
    $set: {
      [`role_capacity.${request.body.role}`]: request.body.capacity,
      [`role_size.${request.body.role}`]: 0,
    },
    $inc: {
      total_capacity: request.body.capacity,
    },
  };
  databaseConnect
    .collection('Events')
    .findOneAndUpdate(query, update, function (error, result) {
      if (error) throw error;
      response.json(result);
    });
});

leaderRoutes.route('/leader/removeEventRole').put(function (request, response) {
  console.log(request.body);

  const databaseConnect = dbo.getDb();
  const query = {
    _id: ObjectId(request.body.event_id),
    admin_id: ObjectId(request.body.admin_id),
  };

  const update = {
    $pull: {
      roles: request.body.role,
    },
    $unset: {
      [`role_capacity.${request.body.role}`]: request.body.capacity,
      [`role_size.${request.body.role}`]: 0,
    },
    $inc: {
      total_capacity: -request.body.capacity,
    },
  };
  databaseConnect
    .collection('Events')
    .findOneAndUpdate(query, update, function (error, result) {
      if (error) throw error;
      response.json(result);
    });
});

leaderRoutes
  .route('/leader/changeEventRoleCapacity')
  .put(function (request, response) {});

leaderRoutes
  .route('/leader/createEventParty')
  .put(function (request, response) {});

export default leaderRoutes; //module.exports = leaderRoutes;
