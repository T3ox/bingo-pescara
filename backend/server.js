const express = require("espress");
const {MongoClient} = require ('mongodb')
require('dotenv').config();

const app = express();
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
let collection;

async function connectDB(){
    await client.connect();
    const db = client.db("BingoPescara");
}
connectDB:

//API per il salvataggio dell'utente nel db
app.post('', async (req, res) =>{ // nelle '' inserire l'url su cui viene fatta la funzione post
    try {

        collection = db.collection("users")

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
        const { email } = req.params;

        const utente = await collection.findOne({ email })

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