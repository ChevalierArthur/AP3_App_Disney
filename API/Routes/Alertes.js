const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const config = require('../bdd.js');

function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: 'token manquant' });
    }

    const token = header.split(' ')[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        return res.status(403).json({ message: 'token invalide' });
    }
}
function getAlertes(req, res) {
    auth(req, res, () => {
    const query = 'SELECT idAlerte, titreAlerte, descriptionAlerte, dateAlerte,  libelleAttraction, idniveauAlerte FROM alerte inner join attraction on alerte.idAttractionAlerte = attraction.idAttraction order by dateAlerte desc';
    config.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: 'erreur bdd' });
        res.json(results);
    });});
}
function addAlerte(req, res) {
    auth(req, res, () => {
        const { titreAlerte, descriptionAlerte, dateAlerte, idAttractionAlerte, idniveauAlerte } = req.body;
        const query = 'INSERT INTO alerte (titreAlerte, descriptionAlerte, dateAlerte, idAttractionAlerte, idniveauAlerte) VALUES (?, ?, ?, ?, ?)';
        config.query(query, [titreAlerte, descriptionAlerte, dateAlerte, idAttractionAlerte, idniveauAlerte], (err) => {
            if (err) return res.status(500).json({ message: 'erreur bdd' });
            res.json({ message: 'alerte ajoutée' });
        });
    });
}
function supprimerAlerte(req, res) {
    auth(req, res, () => {
        const { id } = req.body;
        const query = 'DELETE FROM alerte WHERE idAlerte = ?';
        config.query(query, [id], (err) => {
            if (err) return res.status(500).json({ message: 'erreur bdd' });
            res.json({ message: 'alerte supprimée' });
        });
    });
}
router.post('/deleteAlerte', supprimerAlerte);
router.post('/addAlerte', addAlerte);
router.get('/getAlertes', getAlertes);
module.exports = router;