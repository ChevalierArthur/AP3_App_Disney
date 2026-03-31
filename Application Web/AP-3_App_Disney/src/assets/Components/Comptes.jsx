import { useState, useEffect } from 'react'
import '../CSS/comptes.css'
import { recupererComptes } from '../Services/Comptes.js'

function Comptes() {
    const [utilisateurs, setUtilisateurs] = useState([])
    const [loading, setLoading]           = useState(true)
    const [error, setError]               = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await recupererComptes()
                
                // Sécurité : On s'assure que data est bien un tableau avant de l'assigner
                if (Array.isArray(data)) {
                    setUtilisateurs(data)
                } else {
                    console.error("Erreur API :", data)
                    setError(data.message || "Les données reçues sont invalides.")
                }
            } catch (err) {
                console.error('Erreur chargement comptes :', err)
                setError("Erreur de connexion au serveur.")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="comptes-page">

            {/* ── Toolbar ── */}
            <div className="comptes-toolbar">
                <div className="comptes-toolbar-spacer" style={{ flexGrow: 1 }} />

                {/* Bouton ajouter */}
                <button className="btn-add" onClick={() => { /* TODO : ouvrir modal */ }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', marginRight: '8px' }}>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5"  y1="12" x2="19" y2="12" />
                    </svg>
                    Ajouter un compte
                </button>
            </div>

            {/* ── Tableau ── */}
            <div className="comptes-table-wrapper">
                <table className="comptes-table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Identifiant</th>
                            <th>Équipe</th>
                            <th>Parc</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} className="comptes-empty">Chargement...</td></tr>
                        ) : error ? (
                            <tr><td colSpan={6} className="comptes-empty" style={{ color: 'red' }}>{error}</td></tr>
                        ) : utilisateurs.length === 0 ? (
                            <tr><td colSpan={6} className="comptes-empty">Aucun compte trouvé</td></tr>
                        ) : (
                            utilisateurs.map(u => (
                                <tr key={u.id}>
                                    <td>{u.nom}</td>
                                    <td>{u.prenom}</td>
                                    <td>{u.identifiant}</td>
                                    <td><span className="badge badge-equipe">{u.Equipe}</span></td>
                                    <td><span className="badge badge-parc">{u.Parc}</span></td>
                                    <td>
                                        <button className="btn-edit" onClick={() => { /* TODO : modifier */ }}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', marginRight: '4px' }}>
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                            Modifier
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Comptes