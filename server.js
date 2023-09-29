const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const notesDB = []; // In-memory notes database

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Endpoint to get all notes
app.get('/api/notes', (req, res) => {
  res.json(notesDB);
});

// Endpoint to create a new note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = notesDB.length + 1; // Assign a simple ID for this example
  notesDB.push(newNote);
  res.json(newNote);
});

// Endpoint to delete a note by ID
app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const noteIndex = notesDB.findIndex(note => note.id === noteId);
  
  if (noteIndex !== -1) {
    notesDB.splice(noteIndex, 1);
    res.status(204).send(); // Successful deletion, no content
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

