const fb = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../Helpers/fsUtils.js');


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
      id: uuidv4(),
    };
    readAndAppend(newEntry, './db/db.json');
    res.json('New Note Added');
  }
});

fb.delete('/:id', (req, res) => {
    const noteID = req.params.id
    readFromFile('./db/db.json').then((data) => {
        var newArr =[];
        var arr = JSON.parse(data);
        var indexOF = arr.findIndex(function(i){
        return i.id == noteID;
    });
    arr.splice(indexOF, 1);
    newArr = arr;
    writeToFile('./db/db.json', newArr);
    res.json('Note Deleted');
})
});

module.exports = fb;