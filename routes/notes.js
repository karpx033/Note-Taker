const fb = require('express').Router();
// const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the feedback
fb.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
fb.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { noteTitle, noteText } = req.body;

  // If all the required properties are present
  if (noteTitle && noteText) {
      
    // Variable for the object we will save
    const newEntry = {
      noteTitle,
      noteText,
    };
    console.log(newEntry);
    readAndAppend(newEntry, './db/db.json');

    const response = {
      status: 'success',
      body: newEntry,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

module.exports = fb;