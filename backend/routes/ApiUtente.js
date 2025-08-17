import express from 'express';
import { ObjectId } from 'mongodb';


const router = express.Router();

//API registrazione dell'utente nel db
router.post('/utenti', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const users = db.collection('users');

        const { username, email } = req.body;

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

        await users.insertOne({ 
          username: normalizedUsername, 
          email: normalizedEmail, 
          choices: []
        });

        res.sendStatus(201);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//api per prendere un singolo utente dal db
router.get('/utenti/:username', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const user = await db.collection("users").findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// api per prendere tutti gli utenti
router.get('/users', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const users = await db.collection('users').find({}).toArray();

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//api salvataggio scelte 
router.post('/choices/:userId/save', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const collection = db.collection('users')

    const { userId } = req.params;
    const { choicesId } = req.body;

    if (!choicesId || !Array.isArray(choicesId)) {
      return res.status(400).json({ error: 'Array choicesId mancante o non valido' });
    }

    if (choicesId.length > 6) {
      return res.status(400).json({ error: 'Array con troppi elementi' });
    }

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'ID utente non valido' });
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { choices: choicesId } }
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

export default router;
