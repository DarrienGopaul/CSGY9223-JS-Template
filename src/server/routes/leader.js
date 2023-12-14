const express = require('express')

// leaderRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will
// take control of requests starting with path /leader.

const leaderRoutes = express.Router()

// Assists in connecting to the database
const dbo = require('../db/conn')

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

leaderRoutes.route('/leader/createEvent').post(function (req, response) {
  console.log(req.body);

  const dbConnect = dbo.getDb()
  const object = {
    admin_id:  ObjectId(req.body.admin_id),
    name: req.body.name,
    description: req.body.description,
    start: Date(req.body.start),
    end: Date(req.body.end),
    roles: req.body.roles,
    role_capacity: req.body.role_capacity,
    total_capacity: Object.values(req.body.role_capacity).reduce((total, value) => total + value, 0),
    role_size: Object.fromEntries(Object.entries(req.body.role_capacity,).map(([key, value]) => [key, 0])),
    total_size: 0,
    queue: [],
    party: []
  };
  dbConnect.collection('Events').insertOne(object, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
})

leaderRoutes.route('/leader/cancelEvent').delete(function (req, response) {
  console.log(req.body);

  const dbConnect = dbo.getDb()
  const query = {_id: ObjectId(req.body.event_id), admin_id: ObjectId(req.body.admin_id)};
  dbConnect.collection('Events').deleteOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
})

leaderRoutes.route('/leader/getEventInfo').get(function (req, response) {
  const dbConnect = dbo.getDb()
  const query = {_id: ObjectId(req.body.event_id), admin_id: ObjectId(req.body.admin_id)};
  dbConnect.collection('Events').findOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
})

leaderRoutes.route('/leader/changeEventName').put(function (req, response) {
  console.log(req.body);

  const dbConnect = dbo.getDb()
  const query = {_id: ObjectId(req.body.event_id), admin_id: ObjectId(req.body.admin_id)};
  const update = {
    $set: {
      name: req.body.name,
    },
  };
  dbConnect.collection('Events')
      .findOneAndUpdate(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
})

leaderRoutes.route('/leader/changeEventDescription').put(function (req, response) {
  console.log(req.body);

  const dbConnect = dbo.getDb()
  const query = {_id: ObjectId(req.body.event_id), admin_id: ObjectId(req.body.admin_id)};
  const update = {
    $set: {
      description: req.body.description,
    },
  };
  dbConnect.collection('Events')
      .findOneAndUpdate(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
})

leaderRoutes.route('/leader/changeEventStart').post(function (req, response) {
  console.log(req.body);

  const dbConnect = dbo.getDb()
  const query = {_id: ObjectId(req.body.event_id), admin_id: ObjectId(req.body.admin_id)};
  const update = {
    $set: {
      start: req.body.start,
    },
  };
  dbConnect.collection('Events')
      .findOneAndUpdate(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
})

leaderRoutes.route('/leader/changeEventEnd').post(function (req, response) {
  console.log(req.body);

  const dbConnect = dbo.getDb()
  const query = {_id: ObjectId(req.body.event_id), admin_id: ObjectId(req.body.admin_id)};
  const update = {
    $set: {
      end: req.body.end,
    },
  };
  dbConnect.collection('Events')
      .findOneAndUpdate(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
})

leaderRoutes.route('/leader/addEventRole').put(function (req, response) {
  console.log(req.body);

  const dbConnect = dbo.getDb()
  const query = {_id: ObjectId(req.body.event_id), admin_id: ObjectId(req.body.admin_id)};

  const update = {
    $push: {
      roles: req.body.role,
    },
    $set: {
      [`role_capacity.${req.body.role}`]: req.body.capacity,
      [`role_size.${req.body.role}`]: 0
    },
    $inc: {
      total_capacity: req.body.capacity,
    }
  };
  dbConnect.collection('Events')
      .findOneAndUpdate(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
})

leaderRoutes.route('/leader/removeEventRole').put(function (req, response) {
  console.log(req.body);

  const dbConnect = dbo.getDb()
  const query = {_id: ObjectId(req.body.event_id), admin_id: ObjectId(req.body.admin_id)};

  const update = {
    $pull: {
      roles: req.body.role,
    },
    $unset: {
      [`role_capacity.${req.body.role}`]: req.body.capacity,
      [`role_size.${req.body.role}`]: 0
    },
    $inc: {
      total_capacity: -req.body.capacity,
    }
  };
  dbConnect.collection('Events')
      .findOneAndUpdate(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
})

leaderRoutes.route('/leader/createEventParty').put(function (req, response) {})

module.exports = leaderRoutes
