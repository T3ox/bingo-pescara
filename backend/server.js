import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

import utentiRoutes from './routes/ApiUtente.js';
import scelteRoutes from './routes/ApiScelte.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Logger si può cancellare se si vuole
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api', utentiRoutes);
app.use('/api', scelteRoutes);


// Connect to DB and start server
const PORT = process.env.PORT || 3000;
const client = new MongoClient(process.env.MONGODB_URI);

async function startServer() {
  try {
    await client.connect();
    app.locals.db = client.db('BingoPescara');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();