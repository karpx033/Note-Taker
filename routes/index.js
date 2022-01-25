const express = require('express');

const notesRouter = require('./notes.js');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;
