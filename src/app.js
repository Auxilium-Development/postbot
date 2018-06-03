/* eslint-disable no-mixed-requires, sort-vars, one-var */
const path = require('path');

require('dotenv').config({path: path.join(__dirname, '.env')});
const AuxBot = require(path.join(__dirname, 'AuxBot.js')),
  start = function () {
    new AuxBot(process.env.token).init();
  };

start();