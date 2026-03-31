const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const config = require('../bdd.js');
function creerToken(userId) {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '10s' }
    );
}

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
router.get('/', (req, res) => {
    res.send("login GET works")
});
router.get('/verify', auth, (req, res) => {
    res.json({ message: 'token valide' });
});
router.post('/login', (req, res) => {
    console.log("Corps reçu:", req.body);
    const { login, mdp } = req.body;
    const query = 'SELECT idUtilisateur, mdpUtilisateur, idEquipeUtilisateur FROM utilisateur WHERE identifiantUtilisateur = ? ';
    config.query(query, [login], (err, results) => {
        if (err) return res.status(500).json({ message: 'erreur bdd' });
        if (results.length === 0) {
            return res.status(401).json({ message: 'login incorrect' });
        }
        const user = results[0];
        if (user.mdpUtilisateur !== mdp) {
            return res.status(401).json({ message: 'mdp incorrect' });
        }
        const token = creerToken(user.idUtilisateur);
        res.json({ id:user.idUtilisateur, token, role: user.idEquipeUtilisateur });
        console.log("Utilisateur connecté:", user.idUtilisateur, token, "Rôle:", user.idEquipeUtilisateur);
    }
    );
});

router.get('/create_user', auth, (req, res) => {
    const { login, mdp, role } = req.body;
    const query = 'INSERT INTO users (nomUtilisateur, prenomUtilisateur, identifiantUtilisateur, mdpUtilisateur, idEquipeUtilisateur) VALUES (?, ?, ?, ?, ?)';
    config.query(query, [login, mdp, role], (err, results) => {
        if (err) return res.status(500).json({ message: 'erreur bdd' });
        res.json({ message: 'utilisateur créé', id: results.insertId });
    });
});

module.exports = router;