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
    console.log("delete button clicked");
    console.log(req.params.id);

const noteID = req.params.id
readFromFile('./db/db.json').then((data) => {

    var arr = JSON.parse(data);
       var newData =  arr.splice(arr.findIndex(function(){
        return noteID;
    }), 1);;
    console.log(newData);
       writeToFile('./db/db.json', newData);
    
})

})

module.exports = fb;