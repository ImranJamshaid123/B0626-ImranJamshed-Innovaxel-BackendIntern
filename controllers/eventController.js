import db from '../database/db.js';
import { v4 as uuidv4 } from 'uuid';

export async function getAllEvents(req, res) {
  try {
    const { upcoming, sort } = req.query;

    let query = `
      SELECT 
        e.id,
        e.title,
        e.date,
        e.capacity,
        COUNT(r.id) as total_registrations,
        (e.capacity - COUNT(r.id)) as available_seats
      FROM events e
      LEFT JOIN registrations r ON e.id = r.event_id
    `;

    let conditions = [];
    let params = [];

    if (upcoming === 'true') {
      conditions.push(`date(e.date) > date('now')`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ');
    }

    query += ` GROUP BY e.id `;

    if (sort === 'date') {
      query += ` ORDER BY date(e.date) ASC`;
    }

    const events = await db.all(query, params);

    res.json({
      message: 'Events fetched successfully',
      data: events
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createEvent(req, res) {
  try {
    const { title, date, capacity } = req.body;

    if (!title || !date || capacity === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (capacity <= 0) {
      return res.status(400).json({ error: 'Total seats must be greater than 0' });
    }

    const eventDate = new Date(date);
    const today = new Date();

    if (eventDate <= today) {
      return res.status(400).json({ error: 'Event date must be in the future' });
    }

    const existingEvent = await db.get(
      `SELECT * FROM events WHERE title = ?`,
      [title]
    );

    if (existingEvent) {
      return res.status(400).json({ error: 'Event name must be unique' });
    }

    const id = uuidv4();

    await db.run(
      `INSERT INTO events (id, title, date, capacity) VALUES (?, ?, ?, ?)`,
      [id, title, date, capacity]
    );

    res.status(201).json({
      message: 'Event created successfully',
      id
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
