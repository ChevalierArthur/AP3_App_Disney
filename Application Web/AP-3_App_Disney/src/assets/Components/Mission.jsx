import { useState, useEffect } from "react";
import '../CSS/Mission.css'
import { getMissions } from "../Services/mission.js";


function Mission() {
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAjoutForm, setShowAjoutForm] = useState(false);
    useEffect(() => {
        const fetchMissions = async () => {
            try {
            const data = await getMissions();
                console.log('Données reçues :', data);
                if (Array.isArray(data)) {
                    setMissions(data);
                } else {
                    console.error("Erreur API :", data);
                    setError(data.message || "Les données reçues sont invalides.");
                }
            } catch (err) {
                console.error('Erreur chargement missions :', err);
                setError("Erreur de connexion au serveur.");
            } finally {
                setLoading(false);
            }
        };
        fetchMissions();
    }, []);

    if (loading) {
        return <div className="loading">Chargement des missions...</div>;
    }

    if (error) {
        return <div className="error">Erreur : {error}</div>;
    }

    return (
        <div className="missions-container">
            <h1>Liste des Missions</h1>
            <button className="ajout-btn" onClick={() => setShowAjoutForm(true)}>Ajouter une mission</button>
            <div className="missions-grid" >
                {missions.map((mission) => (
                    <div key={mission.id} className="mission-card">
                        <h2>{mission.titreMission}</h2>
                        <p className="description">{mission.descriptionMission}</p>
                        <div className="mission-dates">
                            <p><strong>Date début prévue:</strong> {mission.dateDebut}</p>
                            <p><strong>Date début réel:</strong> {mission.dateDebutReel || "Non défini"}</p>
                            <p><strong>Date fin:</strong> {mission.dateFin}</p>
                        </div>
                        {mission.Commentaire && (
                            <div className="mission-commentaire">
                                <strong>Commentaire:</strong>
                                <p>{mission.Commentaire}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function ajoutMission() {
    const [titreMission, setTitreMission] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await addMission(titreMission, dateDebut, dateFin);
            console.log('Mission ajoutée :', data);
        } catch (err) {
            console.error('Erreur ajout mission :', err);
        }
    };
    return (
        <div className="ajout-mission-container">
            <h2>Ajouter une mission</h2>
            <form onSubmit={handleSubmit} className="ajout-mission-form">
                <div className="form-group">
                    <label htmlFor="titreMission">Titre de la mission:</label>
                    <input
                        type="text"
                        id="titreMission"
                        value={titreMission}
                        onChange={(e) => setTitreMission(e.target.value)}
                    required/>
                </div>
                <div className="form-group">
                    <label htmlFor="dateDebut">Date de début prévue:</label>
                    <input
                        type="date"
                        id="dateDebut"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                    required/>
                </div>
                <div className="form-group">
                    <label htmlFor="dateFin">Date de fin prévue:</label>
                    <input
                        type="date"
                        id="dateFin"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                    required/>
                </div>
                <button className="submit-btn" type="submit">
                    Ajouter la mission
                </button>
            </form>
        </div>
    );
}
export default Mission;