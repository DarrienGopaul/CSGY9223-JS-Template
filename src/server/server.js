//require('dotenv').config();
//require('dotenv').config({ path: '.env' });
import dotenv from 'dotenv';
dotenv.config();

import express from 'express'; //const express = require('express');
import cors from 'cors'; //const cors = require('cors');
import leader from './routes/leader.js';
import participant from './routes/participant.js';
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(leader); //app.use(require('./routes/leader'));
app.use(participant); //app.use(require('./routes/participant'));

import listRoutes from 'express-list-routes'; //const listRoutes = require('express-list-routes');

console.log('\n ---------------- ALL ROUTES (START) ---------------- \n');
console.log(listRoutes(app));
console.log('\n ---------------- ALL ROUTES (END) ---------------- \n');

import dbo from './db/conn.js'; //const dbo = require('./db/conn');

// const path = require('node:path');

app.listen(port, () => {
  dbo.connectToServer(function (error) {
    if (error) console.error(error);
  });
  console.log(`Server is running on port: ${port}`);
});
