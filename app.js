import express from 'express';
import 'dotenv/config';
import db from './database/db.js';
import eventRoutes from './routes/eventRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/events', eventRoutes);
app.use('/registrations', registrationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});