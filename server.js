const express = require('express');
const path = require('path');
<<<<<<< HEAD
const sqlite3 = require('sqlite3').verbose();
=======
>>>>>>> main

const app = express();
const PORT = process.env.PORT || 3000;

<<<<<<< HEAD
app.use(express.json());

// database setup
const db = new sqlite3.Database(path.join(__dirname, 'contacts.db'));
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY,
    name TEXT,
    surname TEXT,
    phone TEXT,
    email TEXT,
    photo TEXT,
    x INTEGER,
    y INTEGER
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact_id INTEGER,
    time INTEGER,
    level INTEGER
  )`);
});

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// API: list contacts with history
app.get('/api/contacts', (req, res) => {
  db.all('SELECT * FROM contacts', (err, contacts) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!contacts.length) return res.json([]);
    const ids = contacts.map(c => c.id);
    const placeholders = ids.map(() => '?').join(',');
    db.all(`SELECT * FROM history WHERE contact_id IN (${placeholders})`, ids, (err, hist) => {
      if (err) return res.status(500).json({ error: err.message });
      contacts.forEach(c => {
        c.history = hist.filter(h => h.contact_id === c.id);
      });
      res.json(contacts);
    });
  });
});

// API: create new contact
app.post('/api/contacts', (req, res) => {
  const c = req.body;
  db.run(
    `INSERT INTO contacts(id,name,surname,phone,email,photo,x,y) VALUES(?,?,?,?,?,?,?,?)`,
    [c.id, c.name, c.surname, c.phone, c.email, c.photo, c.x, c.y],
    err => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ ok: true });
    }
  );
});

// API: update contact and history
app.put('/api/contacts/:id', (req, res) => {
  const c = req.body;
  db.run(
    `UPDATE contacts SET name=?,surname=?,phone=?,email=?,photo=?,x=?,y=? WHERE id=?`,
    [c.name, c.surname, c.phone, c.email, c.photo, c.x, c.y, req.params.id],
    err => {
      if (err) return res.status(500).json({ error: err.message });
      const stmt = db.prepare(`INSERT INTO history(contact_id,time,level) VALUES(?,?,?)`);
      (c.history || []).forEach(h => stmt.run([req.params.id, h.time, h.level]));
      stmt.finalize(err2 => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json({ ok: true });
      });
    }
  );
});

// API: delete contact
app.delete('/api/contacts/:id', (req, res) => {
  db.run(`DELETE FROM contacts WHERE id=?`, [req.params.id], err => {
    if (err) return res.status(500).json({ error: err.message });
    db.run(`DELETE FROM history WHERE contact_id=?`, [req.params.id], err2 => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ ok: true });
    });
  });
=======
// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// API endpoint
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from backend' });
>>>>>>> main
});

// Fallback: serve index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
