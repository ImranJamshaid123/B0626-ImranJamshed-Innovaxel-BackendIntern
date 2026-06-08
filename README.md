# 🎟️ Event Registration System API

A backend application built with **Node.js**, **Express.js**, and **SQLite** that allows users to create events and manage registrations with proper validations and concurrency handling.

---

## 🚀 Features

### ✅ Event Management

* Create events with:

  * Unique event name
  * Future event date
  * Limited seating capacity
* Validation for:

  * Unique event titles
  * Valid future dates
  * Capacity > 0

---

### 👥 User Registration

* Register users for events
* Prevent:

  * Duplicate registrations
  * Overbooking (event full)
* Store registration timestamp

---

### 📊 View Events

* Fetch all events with:

  * Total registrations
  * Available seats
* Supports:

  * 📅 Sorting by date
  * 🔍 Filtering upcoming events

---

### ❌ Cancel Registration

* Users can cancel their registration
* Ensures:

  * Seat becomes available again
  * Removed from active registrations

---

### ⚡ Edge Case Handling

* Prevents race conditions (overbooking)
* Handles duplicate requests safely
* Maintains consistent seat count
* Proper error handling for all scenarios

---

🛠 **Tech Stack**

* **Backend:** Node.js, Express.js
* **Database:** SQLite
* **Utilities:** UUID

---

📌 **API Endpoints**

📍 **Events**

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| GET    | `/events`               | Get all events      |
| GET    | `/events?upcoming=true` | Get upcoming events |
| GET    | `/events?sort=date`     | Sort events by date |
| POST   | `/events`               | Create new event    |

---

📍 **Registrations**

| Method | Endpoint                              | Description             |
| ------ | ------------------------------------- | ----------------------- |
| POST   | `/registrations`                      | Register user for event |
| DELETE | `/registrations/:event_id/:user_name` | Cancel registration     |

---

📂 **Project Structure**

```
event-registration-system/
│
├── controllers/        # Business logic
├── routes/             # API routes
├── database/           # DB setup
├── db.js               # Database connection
├── app.js / server.js  # Entry point
├── package.json
├── README.md
└── .gitignore

⭐ Notes

This project was built as part of a backend assessment.
Focused on clean architecture, validation, and real-world edge cases.

