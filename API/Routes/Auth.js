const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const config = require('../bdd.js');
const bcrypt = require('bcryptjs');


function creerToken(userId) {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '10m' }
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
router.get('/verify', auth, (req, res) => {
    res.json({ message: 'token valide' });
});
router.get('/', (req, res) => {
    res.send("login GET works")
});

router.post('/login', (req, res) => {
    const { login, mdp } = req.body;
    
    const query = 'SELECT idUtilisateur, mdpUtilisateur, libelleEquipe as libelleE FROM utilisateur inner join equipe on utilisateur.idEquipeUtilisateur = equipe.idEquipe WHERE identifiantUtilisateur = ? ';
    
    config.query(query, [login], async (err, results) => {
        if (err) return res.status(500).json({ message: 'erreur bdd' });
        
        if (results.length === 0) {
            return res.status(401).json({ message: 'login incorrect' });
        }

        const user = results[0];

        const mdpValide = await bcrypt.compare(mdp, user.mdpUtilisateur);

        if (!mdpValide) {
            return res.status(401).json({ message: 'mdp incorrect' });
        }

        const token = creerToken(user.idUtilisateur);
        res.json({ id: user.idUtilisateur, token, role: user.libelleE });
    });
});

router.post('/create_user', async (req, res) => {
    const { nom, prenom, login, mdp, idEquipe } = req.body;
    
    try {
        // On hache le mot de passe avec un "sel" de 10
        const mdpHache = await bcrypt.hash(mdp, 10);

        const query = 'INSERT INTO utilisateur (nomUtilisateur, prenomUtilisateur, identifiantUtilisateur, mdpUtilisateur, idEquipeUtilisateur) VALUES (?, ?, ?, ?, ?)';
        
        config.query(query, [nom, prenom, login, mdpHache, idEquipe], (err, results) => {
            if (err) return res.status(500).json({ message: 'erreur bdd' });
            res.json({ message: 'utilisateur créé', id: results.insertId });
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors du hachage" });
    }
});

module.exports = router;