const path = require('path');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const router = require('express').Router();





router.post('/', (req, res) => {
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      readAndAppend(newNote, './db/router.json');
      res.json(` 🚀`);
    } else {
      res.error('');
    }
  });
  
  module.exports = router;
  