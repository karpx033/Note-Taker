const fb = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../Helpers/fsUtils.js');

// GET Route for retrieving all the feedback
fb.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
fb.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  console.log(req.body);
  console.log(title);
  // If all the required properties are present
  if (title && text) {
      
    // Variable for the object we will save
    const newEntry = {
      title,
      text,
      note_id: uuidv4(),
    };
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