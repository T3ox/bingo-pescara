import express, { json } from "express";
import { MongoClient } from 'mongodb';
import { ObjectId } from "mongodb";

import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(json());

const client = new MongoClient(process.env.MONGODB_URI);

let collection;
let db;

async function connectDB(){
    try {

        await client.connect();
        db = client.db("BingoPescara");
        collection = db.collection("users")

    } catch (err) {
        console.error("errore di connessione al Db:", err);
    }
}
connectDB();

//API per il salvataggio dell'utente nel db
app.post('/api/utenti', async (req, res) =>{ // nelle '' inserire l'url su cui viene fatta la funzione post
    try {

        const { username, email } = req.body;

        if (!username || !email ) {
            return res.status(400).json({ error: "inserire entrambi i campi per proseguire"})
        }

        const result = await collection.insertOne({ username, email });

        res.status(201).json({
        message: "utente creato con successo",
        id: result.insertedId
    });
} catch (err) {
    res.status(500).json({ error: err.message });
}
}); 


//api per prendere un singolo utente dal db
app.get('/api/utenti/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const utente = await collection.findOne({ _id: new ObjectId(id) })

        if (!utente) {
            return res.status(404).json({ error:"Utente non trovato"})
        }
        res.json(utente);

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

app.listen(3000, () => {
    console.log("server avviato sulla porta 3000")
})