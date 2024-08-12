const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
// const port = 5000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "test",
  // connectionLimit: 10
});

const queryDatabase = (query, values = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

app.get('/flashcards', async (req, res) => {
  try {   
    const results = await queryDatabase('SELECT * FROM `tablecard`');
    const processedResults = results.map(flashcard => {
      try {
        return {
          ...flashcard,
          options: JSON.parse(flashcard.options) 
        };
      } catch (err) {
        console.error('Error parsing JSON:', err);
        return {
          ...flashcard,
          options: [] 
        };
      }
    });
    res.json(processedResults);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/flashcards', async (req, res) => {
  const { question, answer, options } = req.body;
  try {
    const optionsJson = JSON.stringify(options);
    await queryDatabase('INSERT INTO tablecard (question, answer, options) VALUES (?, ?, ?)', [question, answer, optionsJson]);
    res.status(201).json({ message: 'Flashcard added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  const { question, answer, options } = req.body;
  try {
    const optionsJson = JSON.stringify(options);
    await queryDatabase('UPDATE tablecard SET question = ?, answer = ?, options = ? WHERE id = ?', [question, answer, optionsJson, id]);
    res.status(200).json({ message: 'Flashcard updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/flashcards', async (req, res) => {
  const { question } = req.query;
  console.log('Deleting flashcard with question:', question); 

  if (!question) {
    return res.status(400).json({ error: 'Question parameter is missing' });
  }

  try {
    const result = await queryDatabase('DELETE FROM tablecard WHERE question = ?', [question]);
    console.log('Delete result:', result); 
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Flashcard deleted successfully' });
    } else {
      res.status(404).json({ message: 'Flashcard not found' });
    }
  } catch (err) {
    console.error('Error:', err); 
    res.status(500).json({ error: err.message });
  }
});





app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
