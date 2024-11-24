import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors'; 

const app = express();
const db = new sqlite3.Database('banco.db');

app.use(cors());
app.use(express.json());


app.get('/api/produtos', (req, res) => {
  db.all('SELECT * FROM produtos6', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});