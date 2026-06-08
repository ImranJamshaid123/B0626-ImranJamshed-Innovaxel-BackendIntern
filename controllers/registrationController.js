import db from '../database/db.js';
import { v4 as uuidv4 } from 'uuid';

export async function register(req, res) {
  try {
    const { event_id, user_name } = req.body;

    if (!event_id || !user_name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const event = await db.get(
      `SELECT * FROM events WHERE id = ?`,
      [event_id]
    );

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const countResult = await db.get(
      `SELECT COUNT(*) as count FROM registrations WHERE event_id = ?`,
      [event_id]
    );

    if (countResult.count >= event.capacity) {
      return res.status(400).json({ error: 'Event is full' });
    }

    const existingUser = await db.get(
      `SELECT * FROM registrations WHERE event_id = ? AND user_name = ?`,
      [event_id, user_name]
    );

    if (existingUser) {
      return res.status(400).json({ error: 'User already registered' });
    }

    const id = uuidv4();
    const timestamp = new Date().toISOString();

    await db.run(
      `INSERT INTO registrations (id, event_id, user_name, created_at)
       VALUES (?, ?, ?, ?)`,
      [id, event_id, user_name, timestamp]
    );

    res.status(201).json({
      message: 'Registration successful',
      id,
      registered_at: timestamp
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function cancelRegistration(req, res) {
  const { event_id, user_name } = req.params;

  try {
    await db.run('BEGIN TRANSACTION');

    const registration = await db.get(
      `SELECT * FROM registrations WHERE event_id = ? AND user_name = ?`,
      [event_id, user_name]
    );

    if (!registration) {
      await db.run('ROLLBACK');
      return res.status(404).json({ error: 'Registration not found' });
    }

    await db.run(
      `DELETE FROM registrations WHERE event_id = ? AND user_name = ?`,
      [event_id, user_name]
    );

    await db.run('COMMIT');

    res.json({ message: 'Registration cancelled successfully' });

  } catch (error) {
    await db.run('ROLLBACK');
    res.status(500).json({ error: error.message });
  }
}
