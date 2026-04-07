import { useState, useEffect } from 'react'
import '../CSS/comptes.css'
import { recupererComptes } from '../Services/Comptes.js'
import { ajouterCompte } from '../Services/Comptes.js'
function Comptes() {
    const [utilisateurs, setUtilisateurs] = useState([])
    const [loading, setLoading]= useState(true)
    const [error, setError]= useState(null)
    const [showModalajouter, setShowModalajouter] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await recupererComptes()
                
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

            <div className="comptes-toolbar">
                <div className="comptes-toolbar-spacer" style={{ flexGrow: 1 }} />

                <button className="btn-add" onClick={() => {  setShowModalajouter(true) }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', marginRight: '8px' }}>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5"  y1="12" x2="19" y2="12" />
                    </svg>
                    Ajouter un compte
                </button>
            </div>

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
                                    <td><span className="badge badge-parc">{u.libelleparc}</span></td>
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
            {showModalajouter && (<Modal_Ajouter utilisateurs={utilisateurs} fermerModal={() => setShowModalajouter(false)} />)}
        </div>
    )
}
function Modal_Ajouter({ utilisateurs, fermerModal }) {
        const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const nom = formData.get('nom');
        const prenom = formData.get('prenom');
        const identifiant = formData.get('identifiant');
        const motDePasse = formData.get('motDePasse');
        const idEquipe = formData.get('idEquipe');
        ajouterCompte(nom, prenom, identifiant, motDePasse, idEquipe).then(data => {
            if (data && data.message === 'Compte ajouté avec succès') {
                alert('Compte ajouté avec succès');
                fermerModal();
            } else {
                alert(data?.message || "Erreur lors de l'ajout du compte.");
            }
        })
    }
    
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Ajouter un compte</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>Nom:</label>
                    <input type="text" name="nom" required />
                    <label>Prénom:</label>
                    <input type="text" name="prenom" required />
                    <label>Identifiant:</label>
                    <input type="text" name="identifiant" required />
                    <label>Mot de passe:</label>
                    <input type="password" name="motDePasse" required />
                    <label>Équipe:</label>
                    <select name="idEquipe" required>
                        <option value="">Sélectionner une équipe</option>
                        {utilisateurs.map(u => (
                            <option className="option-modal" key={u.idequipe} value={u.idequipe}>{u.Equipe}</option>
                        ))}
                    </select>
                    <div className="modal-actions">
                        <button type="submit" className="btn-add">Ajouter</button>
                        <button type="button" className="btn-cancel" onClick={() => fermerModal()}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Comptes