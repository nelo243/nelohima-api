const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Autorise ton site Neocities à appeler ce serveur
app.use(cors());

// Ta clé API (Render l'utilisera depuis ses paramètres ou celle-ci par défaut)
const API_KEY = process.env.NEWS_API_KEY || "814f054ede894c1bae94f95ab1721c68";

app.get('/api/news', async (req, res) => {
    try {
        const query = req.query.q || 'technologie';
        const page = req.query.page || 1;
        
        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=fr&pageSize=10&page=${page}&apiKey=${API_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        res.json(data);
    } catch (error) {
        console.error("Erreur Serveur:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des news" });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur NELOHIMA lancé sur le port ${PORT}`);
});


