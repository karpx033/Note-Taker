const fb = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../Helpers/fsUtils.js');

fb.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

fb.post('/', (req, res) => {
  const { title, text } = req.body;
  console.log(req.body);
  console.log(title);
  if (title && text) {
      
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

fb.delete('/:id', (req, res) => {
const noteID = req.params.id
readFromFile('./db/db.json').then((data) => {
    if (noteID===data.note_id) {
       var newData =  data.splice(_.indexOf(data, _.findWhere(data, { note_id : `${noteID}`})), 1);
       readAndAppend(newData, './db/db.json');
    }
})

})

module.exports = fb;