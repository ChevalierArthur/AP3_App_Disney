import { useState, useEffect } from 'react'
import '../CSS/comptes.css'
import { recupererComptes, ajouterCompte, modifierCompte, supprimerutilisateur } from '../Services/Comptes.js'
import { getEquipe } from '../Services/Equipe.js'
import { getMissions, getMissionByUtilisateur, donnerMission, retirerMission } from '../Services/mission.js'

function Comptes() {
    const [utilisateurs, setUtilisateurs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showModalajouter, setShowModalajouter] = useState(false)
    const [utilisateurAModifier, setUtilisateurAModifier] = useState(null)
    const [update, setUpdate] = useState(0)

    const rafraichir = () => setUpdate(u => u + 1)

    useEffect(() => {
        setLoading(true)
        setError(null)
        recupererComptes()
            .then(data => {
                if (Array.isArray(data)) {
                    setUtilisateurs(data)
                } else {
                    console.error("Erreur API :", data)
                    setError(data.message || "Les données reçues sont invalides.")
                }
            })
            .catch(err => {
                console.error('Erreur chargement comptes :', err)
                setError("Erreur de connexion au serveur.")
            })
            .finally(() => setLoading(false))
    }, [update])

    return (
        <div className="comptes-page">
            <div className="comptes-toolbar">
                <div className="comptes-toolbar-spacer" style={{ flexGrow: 1 }} />
                <button className="btn-add" onClick={() => setShowModalajouter(true)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', marginRight: '8px' }}>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
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
                                        <button className="btn-edit" onClick={() => setUtilisateurAModifier(u)}>
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

            {showModalajouter && (
                <Modal_Ajouter
                    fermerModal={() => setShowModalajouter(false)}
                    rafraichir={rafraichir}
                />
            )}

            {utilisateurAModifier && (
                <Modal_Modifier
                    utilisateur={utilisateurAModifier}
                    fermerModal={() => setUtilisateurAModifier(null)}
                    rafraichir={rafraichir}
                />
            )}
        </div>
    )
}

function Modal_Ajouter({ fermerModal, rafraichir }) {
    const [equipes, setEquipes] = useState([])

    useEffect(() => {
        getEquipe().then(data => {
            if (Array.isArray(data)) setEquipes(data)
            else console.error("Erreur API :", data)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const nom = formData.get('nom')
        const prenom = formData.get('prenom')
        const identifiant = formData.get('identifiant')
        const motDePasse = formData.get('motDePasse')
        const idEquipe = formData.get('idEquipe')
        ajouterCompte(nom, prenom, identifiant, motDePasse, idEquipe).then(data => {
            if (data) { rafraichir(); fermerModal() }
        })
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Ajouter un compte</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>Nom :</label>
                    <input type="text" name="nom" required />
                    <label>Prénom :</label>
                    <input type="text" name="prenom" required />
                    <label>Identifiant :</label>
                    <input type="text" name="identifiant" required />
                    <label>Mot de passe :</label>
                    <input type="password" name="motDePasse" required />
                    <label>Équipe :</label>
                    <select name="idEquipe" required>
                        <option value="">Sélectionner une équipe</option>
                        {equipes.map(e => (
                            <option className="option-modal" key={e.id} value={e.id}>{e.libelle}</option>
                        ))}
                    </select>
                    <div className="modal-actions">
                        <button type="submit" className="btn-add">Ajouter</button>
                        <button type="button" className="btn-cancel" onClick={fermerModal}>Fermer</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function Modal_Modifier({ utilisateur, fermerModal, rafraichir }) {
    const [equipes, setEquipes] = useState([])
    const [showModalMission, setShowModalMission] = useState(false)

    useEffect(() => {
        getEquipe().then(data => {
            if (Array.isArray(data)) setEquipes(data)
            else console.error("Erreur API :", data)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const nom = formData.get('nom')
        const prenom = formData.get('prenom')
        const identifiant = formData.get('identifiant')
        const motDePasse = formData.get('motDePasse')
        const idEquipe = formData.get('idEquipe')
        modifierCompte(utilisateur.id, nom, prenom, identifiant, motDePasse || null, idEquipe).then(data => {
            if (data) { rafraichir(); fermerModal() }
        })
    }

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <h2>Modifier le compte</h2>
                    <form onSubmit={handleSubmit} className="modal-form">
                        <label>Nom :</label>
                        <input type="text" name="nom" defaultValue={utilisateur.nom} required />
                        <label>Prénom :</label>
                        <input type="text" name="prenom" defaultValue={utilisateur.prenom} required />
                        <label>Identifiant :</label>
                        <input type="text" name="identifiant" defaultValue={utilisateur.identifiant} required />
                        <label>Nouveau mot de passe :</label>
                        <input type="password" name="motDePasse" placeholder="Laisser vide pour ne pas changer" />
                        <label>Équipe :</label>
                        <select name="idEquipe" defaultValue={utilisateur.idEquipe ?? ''}>
                            <option value="">Sélectionner une équipe</option>
                            {equipes.map(e => (
                                <option className="option-modal" key={e.id} value={e.id}>{e.libelle}</option>
                            ))}
                        </select>

                        {/* Actions principales */}
                        <div className="modal-actions">
                            <button type="submit" className="btn-add">Enregistrer</button>
                            <button type="button" className="btn-add" onClick={() => setShowModalMission(true)}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', marginRight: '4px' }}>
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                Mission
                            </button>
                            <button type="button" className="btn-cancel" onClick={() => { fermerModal(); rafraichir() }}>
                                Fermer
                            </button>
                        </div>

                        {/* Zone de danger séparée */}
                        <div style={{ borderTop: '1px solid #fee2e2', marginTop: '16px', paddingTop: '16px' }}>
                            <button
                                type="button"
                                className="btn-supprimer"
                                style={{ width: '100%' }}
                                onClick={() => {
                                    if (window.confirm(`Supprimer le compte de ${utilisateur.prenom} ${utilisateur.nom} ?`)) {
                                        supprimerutilisateur(utilisateur.id)
                                        rafraichir()
                                        fermerModal()
                                    }
                                }}
                            >
                                Supprimer le compte
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {showModalMission && (
                <Modal_Ajouter_Mission
                    utilisateur={utilisateur}
                    fermerModal={() => setShowModalMission(false)}
                />
            )}
        </>
    )
}


function Modal_Ajouter_Mission({ utilisateur, fermerModal }) {
    const [missions, setMissions] = useState([])
    const [missionsUtilisateur, setMissionsUtilisateur] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [missionEnCours, setMissionEnCours] = useState(null)

    useEffect(() => {
        setLoading(true)
        Promise.all([
            getMissions(),
            getMissionByUtilisateur(utilisateur.id)
        ])
            .then(([toutesLesMissions, missionsDeUtilisateur]) => {
                if (Array.isArray(toutesLesMissions)) setMissions(toutesLesMissions)
                else setError(toutesLesMissions.message || "Erreur chargement des missions.")

                if (Array.isArray(missionsDeUtilisateur)) {
                    setMissionsUtilisateur(missionsDeUtilisateur.map(m => m.idMissionFaire))
                }
            })
            .catch(() => setError("Erreur de connexion au serveur."))
            .finally(() => setLoading(false))
    }, [])

    const dejaAssignee = (idMission) => missionsUtilisateur.includes(idMission)

    const handleToggleMission = (mission) => {
        setMissionEnCours(mission.idMission)

        const action = dejaAssignee(mission.idMission)
            ? retirerMission(mission.idMission,utilisateur.id)
            : donnerMission(mission.idMission,utilisateur.id)

        action
            .then(data => {
                if (data && !data.message?.includes('erreur')) {
                    // Mise à jour locale de la liste sans refetch
                    if (dejaAssignee(mission.idMission)) {
                        setMissionsUtilisateur(prev => prev.filter(id => id !== mission.idMission))
                    } else {
                        setMissionsUtilisateur(prev => [...prev, mission.idMission])
                    }
                } else {
                    alert(data.message || "Erreur lors de l'opération.")
                }
            })
            .catch(() => alert("Erreur de connexion au serveur."))
            .finally(() => setMissionEnCours(null))
    }

    return (
        <div className="modal">
            
            <div className="modal-content-mission">
                <h2>Missions de {utilisateur.prenom} {utilisateur.nom}</h2>

                {loading && <p>Chargement des missions...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {!loading && !error && (
                    <div className="missions-list">
                        {missions.length === 0 ? (
                            <p>Aucune mission disponible.</p>
                        ) : (
                            <div className="missions-grid">
                                {missions.map((mission) => {
                                    const assignee = dejaAssignee(mission.idMission)
                                    const enCours = missionEnCours === mission.idMission

                                    return (
                                        <div
                                            key={mission.idMission}
                                            className="mission-card"
                                            style={{ border: assignee ? '2px solid #1a6eb5' : '2px solid transparent' }}
                                        >
                                            <h2>{mission.titreMission}</h2>
                                            <p className="description">{mission.descriptionMission}</p>
                                            <div className="mission-dates">
                                                <p><strong>Date début prévue :</strong> {mission.dateDebut}</p>
                                                <p><strong>Date début réel :</strong> {mission.dateDebutReel || "Non défini"}</p>
                                                <p><strong>Date fin :</strong> {mission.dateFin}</p>
                                            </div>
                                            {mission.Commentaire && (
                                                <div className="mission-commentaire">
                                                    <strong>Commentaire :</strong>
                                                    <p>{mission.Commentaire}</p>
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                className={assignee ? 'btn-supprimer' : 'btn-add'}
                                                style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}
                                                disabled={enCours}
                                                onClick={() => handleToggleMission(mission)}
                                            >
                                                {enCours
                                                    ? '...'
                                                    : assignee
                                                        ? '✕ Retirer la mission'
                                                        : '+ Assigner la mission'
                                                }
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}

                <div className="modal-actions">
                    <button type="button" className="btn-cancel" onClick={fermerModal}>Fermer</button>
                </div>
            </div>
        </div>
    )
}
export default Comptes