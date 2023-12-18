require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({path: './config.env'});
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require('./routes/leader'));
app.use(require('./routes/participant'));

const listRoutes = require('express-list-routes');
console.log('\n ---------------- ALL ROUTES (START) ---------------- \n');
console.log(listRoutes(app));
console.log('\n ---------------- ALL ROUTES (END) ---------------- \n');

const dbo = require('./db/conn');
const path = require('path');

app.listen(port, () => {
  dbo.connectToServer(function(err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
