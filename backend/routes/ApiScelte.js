import express from 'express';


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