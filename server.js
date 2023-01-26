const express = require('express');
const path = require('path');

const api = require('./routes/index.js');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/notes.json');
    res.json(` successfully saved`);
  } else {
    res.error('');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);





