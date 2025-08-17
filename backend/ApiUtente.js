import cors from 'cors';
import express, { json } from 'express';
import { MongoClient, ObjectId } from 'mongodb';

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
    collection = db.collection('users');
  } catch (err) {
    console.error('errore di connessione al Db:', err);
  }
}
connectDB();

//API registrazione dell'utente nel db
app.post('/api/utenti', async (req, res) => {
    try {
        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(400).json({ error: "Inserisci tutti i campi per registrarti" });
        }

        const normalizedUsername = username.trim().toLowerCase();
        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await db.collection('users').findOne({
            $or: [
                { username: normalizedUsername },
                { email: normalizedEmail }
            ]
        });

        if (existingUser) {
            return res.json({message: "Account gia esistente con queste credenziali"});
        }

        const userDoc = {
            username: username || null,
            email: email || null,
            choice: []
        };

        const result = await db.collection('users').insertOne(userDoc);

        res.status(201).json({
            message: "Utente salvato correttamente",
            userId: result.insertedId
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("server avviato sulla porta 3000")
})

//api per prendere un singolo utente dal db
app.get('/api/utenti/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const utente = await collection.findOne({ username: username });

    if (!utente) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }
    res.json(utente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// api per prendere tutti gli utenti
app.get('/api/users', async (req, res) => {
  try {
    const utenti = await db.collection('users').find({}).toArray();

    if (!utenti || utenti.length === 0) {
      return res.status(404).json({ error: 'Nessun utente trovato' });
    }

    res.json(utenti);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//api salvataggio scelte 
app.post('/api/choices/:userId/save', async (req, res) => {
  try {
    const { userId } = req.params;
    const { choicesId } = req.body;

    if (!choicesId || !Array.isArray(choicesId)) {
      return res.status(400).json({ error: 'Array choicesId mancante o non valido' });
    }

    if (choicesId.length > 6) {
      return res.status(400).json({ error: 'Array con troppi elementi' });
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { choices: choicesId } } // usa $push + $each se vuoi aggiungere senza sovrascrivere
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    res.json({ message: 'Scelte aggiornate con successo' });
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message})
  }
})

app.listen(3000, () => {
  console.log('server avviato sulla porta 3000');
});