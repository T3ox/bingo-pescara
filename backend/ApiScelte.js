import cors from 'cors';
import express, { json } from 'express';
import { MongoClient } from 'mongodb';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(json());

app.use(
  cors({
    origin: '*', // indirizzo del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

const client = new MongoClient(process.env.MONGODB_URI);

let collection;
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('BingoPescara');
    collection = db.collection('choices');
  } catch (err) {
    console.error('errore di connessione al Db:', err);
  }
}
connectDB();

//api per prendere tutte le scelte del bingo
app.get('/api/events', async (req, res) => {
  try {
    const scelte = await collection.find({}).toArray(); // prendo tutte le scelte disponibili non mettendo nulla dentro find

    if (!scelte || scelte.length === 0) {
      return res.status(404).json({ error: 'Nessuna scelta trovata' });
    }

    res.json(scelte);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*app.post("/api/events", async (req, res) => {
    try {
        const events = req.body;

        const result = await collection.insertMany(events);

        res.status(201).json({ message: "Godo, salvataggio riuscito"});
    

    
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Palle, errore durante il salvataggio dei dati"});
    }
})*/

app.listen(3001, () => {
  console.log('server avviato sulla porta 3001');
});
