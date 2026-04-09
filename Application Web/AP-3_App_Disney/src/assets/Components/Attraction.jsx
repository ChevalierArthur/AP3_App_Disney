import { useState,  useEffect} from "react";
import '../CSS/Attraction.css'
import { getAttractions } from "../Services/Attractions.js";

function Attraction() {
    const [attractions, setAttractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                const data = await getAttractions();
                console.log('Données reçues :', data);
                if (Array.isArray(data)) {
                    setAttractions(data);
                } else {
                    console.error("Erreur API :", data);
                    setError(data.message || "Les données reçues sont invalides.");
                }
            } catch (err) {
                console.error('Erreur chargement attractions :', err);
                setError("Erreur de connexion au serveur.");
            } finally {
                setLoading(false);
            }
        };
        fetchAttractions();
    }, []);

    if (loading) {
        return <div className="loading">Chargement des attractions...</div>;
    }

    if (error) {
        return <div className="error">Erreur : {error}</div>;
    }

    return (
        <div className="attractions-container">
            <h1>Attractions</h1>
            <div className="attractions-grid">
                {attractions.map((attraction) => (
                    <div key={attraction.idAttraction} className="attraction-card">
                        <div className="card-image">
                            <img src={attraction.image} alt={attraction.libelleAttraction} />
                        </div>
                        <div className="card-content">
                            <h2>{attraction.libelleAttraction}</h2>
                            <p className="description">{attraction.description}</p>
                            <div className="card-details">
                                <p><strong>Emplacement :</strong> {attraction.libelleZone}</p>
                                <p><strong>Durée :</strong> {attraction.dureeAttraction} minutes</p>
                                <p><strong>Capacité :</strong> {attraction.nbPlaceAttraction} personnes</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Attraction;