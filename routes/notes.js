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


const noteID = req.params.id
readFromFile('./db/db.json').then((data) => {
    var newArr =[];
    var arr = JSON.parse(data);
    console.log("TEST HERE");
    console.log(arr);
    console.log(arr.findIndex(function(i){
        return i.id == noteID;
    }));
    var indexOF = arr.findIndex(function(i){
        return i.id == noteID;
    });
    console.log(indexOF);
    arr.splice(indexOF, 1);

    console.log("TEST RESULTS");
    console.log(arr);
    newArr = arr;
    console.log(newArr);
    writeToFile('./db/db.json', newArr);
    
}).then(res.json(response))

})

module.exports = fb;