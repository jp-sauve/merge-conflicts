
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('citd.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    createTables();
  }
});

const createTables = () => {
  const tables = [
    `CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      image_url TEXT,
      status TEXT CHECK(status IN ('created','active','complete'))
    )`,
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE,
      password_hash TEXT,
      role TEXT CHECK(role IN ('admin','user'))
    )`,
    `CREATE TABLE IF NOT EXISTS game_participants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id TEXT,
      user_id TEXT,
      role TEXT CHECK(role IN ('coder','player2')),
      FOREIGN KEY (game_id) REFERENCES games (id),
      FOREIGN KEY (user_id) REFERENCES users (id)
    )`
  ];

  tables.forEach((table) => {
    db.run(table, (err) => {
      if (err) {
        console.error('Error creating table', err.message);
      }
    });
  });
};

export const runQuery = (query: string, params: any[] = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('Error running query', err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export default db;
