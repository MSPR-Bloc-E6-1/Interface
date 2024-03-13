const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "wildlens"
});

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/api/explication/animals', (req, res) => {
    const nom = req.query.name;
    const selectQuery = `SELECT * FROM animal WHERE nom = ?`;
    pool.query(selectQuery, [nom], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send('Erreur lors de la récupération des données');
        }
        if (result.length === 0) {
            return res.status(404).send('Aucun animal trouvé');
        }
        return res.status(200).json(result);
    });
});

app.listen(3001, () => {
    console.log('Serveur en écoute sur le port 3001');
});
