import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

//api per prendere tutte le scelte del bingo
router.get('/events', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const choices = await db.collection('choices').find({}).toArray(); // prendo tutte le scelte disponibili non mettendo nulla dentro find
    res.json(choices);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/event/:username', async (req, res) =>  {
  try {
    const db = req.app.locals.db;
    const user = await db.collection("users").findOne({ username: req.params.username })

    const choices = user.choices;

    const events = await Promise.all(
      choices.map(async (id) => {
        return await db.collection("choices").findOne({ _id: new ObjectId(id) });    
      })
    );

    res.json({ events });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore del server" + err });
  }
});


/*
app.post("/api/events", async (req, res) => {s
    try {
        const events = req.body;

        const result = await collection.insertMany(events);

        res.status(201).json({ message: "Godo, salvataggio riuscito"});
    

    
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Palle, errore durante il salvataggio dei dati"});
    }
})*/

export default router;