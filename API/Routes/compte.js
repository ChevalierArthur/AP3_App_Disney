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
        console.log("Corps reçu pour ajout d'utilisateur:", req.body);
    const { nom, prenom, identifiant, motDePasse, idEquipe } = req.body;
    console.log("Données extraites:", { nom, prenom, identifiant, motDePasse, idEquipe });
    const query = 'INSERT INTO utilisateur (nomUtilisateur, prenomUtilisateur, identifiantUtilisateur, mdpUtilisateur, idEquipeUtilisateur) VALUES (?, ?, ?, ?, ?)';
    config.query(query, [nom, prenom, identifiant, motDePasse, idEquipe], (err) => {
        if (err) return res.status(500).json({ message: 'Identifiant déjà utilisé' });
        res.json({ message: 'utilisateur ajouté' });
    });});
}
function updateUser(req, res) {
    auth(req, res, () => {
    const { id, nom, prenom, identifiant, motDePasse, idEquipe } = req.body;
    if (motDePasse && motDePasse.trim() !== '' && idEquipe !== null) {
        const query = 'UPDATE utilisateur SET nomUtilisateur = ?, prenomUtilisateur = ?, identifiantUtilisateur = ?, mdpUtilisateur = ?, idEquipeUtilisateur = ? WHERE idUtilisateur = ?';
            return config.query(query, [nom, prenom, identifiant, motDePasse, idEquipe, id], (err) => {
            if (err) return res.status(500).json({ message: 'erreur bdd' });
            res.json({ message: 'utilisateur modifié' });
        }
        );
    } else if (motDePasse && motDePasse.trim() !== '') {
        const query = 'UPDATE utilisateur SET nomUtilisateur = ?, prenomUtilisateur = ?, identifiantUtilisateur = ?, mdpUtilisateur = ? WHERE idUtilisateur = ?';
            return config.query(query, [nom, prenom, identifiant,motDePasse, id], (err) => {
            if (err) return res.status(500).json({ message: 'erreur bdd' });
            res.json({ message: 'utilisateur modifié' });
        });
    }
    else if (idEquipe !== null) {
        const query = 'UPDATE utilisateur SET nomUtilisateur = ?, prenomUtilisateur = ?, identifiantUtilisateur = ?, idEquipeUtilisateur = ? WHERE idUtilisateur = ?';
            return config.query(query, [nom, prenom, identifiant, idEquipe, id], (err) => {
            if (err) return res.status(500).json({ message: 'erreur bdd' });
            res.json({ message: 'utilisateur modifié' });
        }
        );
    }
    else {
        const query = 'UPDATE utilisateur SET nomUtilisateur = ?, prenomUtilisateur = ?, identifiantUtilisateur = ? WHERE idUtilisateur = ?';
            return config.query(query, [nom, prenom, identifiant, id], (err) => {
            if (err) return res.status(500).json({ message: 'erreur bdd' });
            res.json({ message: 'utilisateur modifié' });
        }
        );
    };
});
}
function deleteUser(req, res) {
    auth(req, res, () => {
    const { id } = req.body;
    const query = 'DELETE FROM utilisateur WHERE idUtilisateur = ?';
    config.query(query, [id], (err) => {
        if (err) return res.status(500).json({ message: 'erreur bdd' });
        res.json({ message: 'utilisateur supprimé' });
    });});
}

router.get('/getUsers', getUsers);
router.post('/addUser', addUser);
router.put('/updateUser', updateUser);
router.delete('/deleteUser', deleteUser);

module.exports = router;