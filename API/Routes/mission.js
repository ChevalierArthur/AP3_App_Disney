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

function getMissions(req, res) {
    auth(req, res, () => {
        const query = 'SELECT idMission, titreMission, dateDebut, dateDebutReel, dateFin, Commentaire from mission';
        config.query(query, (err, results) => {
            if (err) return res.status(500).json({ message: 'erreur bdd' });
            res.json(results);
        });
    });
}

router.get('/getMissions', getMissions);

module.exports = router;