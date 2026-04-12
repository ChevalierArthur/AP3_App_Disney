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

function addMission(req, res) {
    auth(req, res, () => {
        const { titreMission, dateDebut, dateFin } = req.body;
        const query = 'INSERT INTO mission (titreMission, dateDebut, dateFin) VALUES (?, ?, ?)';
        config.query(query, [titreMission, dateDebut, dateFin], (err) => {
            if (err) return res.status(500).json({ message: 'erreur bdd' });
            res.json({ message: 'mission ajoutée' });
        });
    });
}

function updateMission(req, res) {
    auth(req, res, () => {
        const { id, titreMission, dateDebut, dateDebutReel, dateFin, Commentaire } = req.body;
        const query = 'UPDATE mission SET titreMission = ?, dateDebut = ?, dateDebutReel = ?, dateFin = ?, Commentaire = ? WHERE idMission = ?';
        config.query(query, [titreMission, dateDebut, dateDebutReel, dateFin, Commentaire, id], (err) => {
            if (err) return res.status(500).json({ message: 'erreur bdd' });
            res.json({ message: 'mission modifiée' });
        });
    });
}

function deleteMission(req, res) {
    auth(req, res, () => {
        const { id } = req.body;
        const query = 'DELETE FROM mission WHERE idMission = ?';
        config.query(query, [id], (err) => {
            if (err) return res.status(500).json({ message: 'erreur bdd' });
            res.json({ message: 'mission supprimée' });
        });
    });
}
function getMissionByUtilisateur(req, res) {
    auth(req, res, () => {
        const userId = req.body.id;
        const query = 'select idMissionFaire from faire where idUtilisateurFaire = ?';
        console.log(userId);
        config.query(query, [userId], (err, results) => {
            if (err) return res.status(500).json({ message: 'erreur bdd' });
            res.json(results);
            console.log(results);
        });
    });
}
function donnerMissionAUtilisateur(req, res) {
    auth(req, res, () => {
        const { idMission, idUtilisateur } = req.body;
        const query = 'INSERT INTO faire (idMissionfaire, idUtilisateurfaire) VALUES (?, ?)';
        config.query(query, [idMission, idUtilisateur], (err) => {
            if (err) return res.status(500).json({ message: 'erreur bdd' });
            res.json({ message: 'mission attribuée à l\'utilisateur' });
        });
    });
}
function retirerMissionAUtilisateur(req, res) {
    auth(req, res, () => {
        const { idMission, idUtilisateur } = req.body;
        const query = 'DELETE FROM faire WHERE idMissionfaire = ? AND idUtilisateurfaire = ?';
        config.query(query, [idMission, idUtilisateur], (err) => {
            if (err) return res.status(500).json({ message: 'erreur bdd' });
            res.json({ message: 'mission retirée de l\'utilisateur' });
        });
    });
}

router.post('/getMissionsByUtilisateur', getMissionByUtilisateur);
router.post('/donnerMissionAUtilisateur', donnerMissionAUtilisateur);
router.post('/retirerMissionAUtilisateur', retirerMissionAUtilisateur);
router.get('/getMissions', getMissions);
router.post('/addMission', addMission);
router.put('/updateMission', updateMission);
router.delete('/deleteMission', deleteMission);

module.exports = router;