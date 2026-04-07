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

function getUsers(req, res) {
    auth(req, res, () => {
    const query = 'SELECT idUtilisateur as id, nomUtilisateur as nom, prenomUtilisateur as prenom, identifiantUtilisateur as identifiant, libelleEquipe as Equipe, idequipe as idequipe ,libelleparc FROM utilisateur inner join equipe on utilisateur.idEquipeUtilisateur = equipe.idEquipe inner join parc on equipe.idParcEquipe = parc.idParc';
    config.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: 'erreur bdd' });
        res.json(results);
    });});
}
function addUser(req, res) {
    auth(req, res, () => {
    const { nom, prenom, identifiant, motDePasse, idEquipe } = req.body;
    const query = 'INSERT INTO utilisateur (nomUtilisateur, prenomUtilisateur, identifiantUtilisateur, motDePasseUtilisateur, idEquipeUtilisateur) VALUES (?, ?, ?, ?, ?)';
    config.query(query, [nom, prenom, identifiant, motDePasse, idEquipe], (err) => {
        if (err) return res.status(500).json({ message: 'erreur bdd' });
        res.json({ message: 'utilisateur ajouté' });
    });});
}
router.get('/getUsers', getUsers);
router.post('/addUser', addUser);

module.exports = router;