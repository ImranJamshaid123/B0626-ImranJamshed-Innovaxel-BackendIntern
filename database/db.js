import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const db = await open({
  filename: './database/events.db',
  driver: sqlite3.Database
});

await db.exec(`PRAGMA foreign_keys = ON;`);
console.log('Database connected successfully');

await db.exec(`
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  capacity INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY,
  event_id TEXT,
  user_name TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id)
);
`);

export default db;