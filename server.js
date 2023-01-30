const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid')


const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.get('/api/notes', async (req, res) => {
  const notes = await readFromFile('./db/notes.json', 'utf8')
  res.json(JSON.parse(notes))
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);





