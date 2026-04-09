import { useState, useEffect } from "react";
import '../CSS/Mission.css'
import { getMissions } from "../Services/mission.js";


function Mission() {
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            <div className="missions-grid">
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
export default Mission;