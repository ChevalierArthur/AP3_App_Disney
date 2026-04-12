import { useState, useEffect } from 'react'
import '../CSS/Alertes.css'
import { GetAlertes, ajouterAlerte, supprimerAlerte } from '../Services/Alertes'
import { getAttractions } from '../Services/Attractions'

const NIVEAU_CONFIG = {
  1: { label: 'Info',    className: 'niveau-4' },
  2: { label: 'Modéré',  className: 'niveau-3' },
  3: { label: 'Élevé',   className: 'niveau-1' }
}

function getBadgeConfig(niveau) {
  return NIVEAU_CONFIG[niveau] ?? { label: `N${niveau}`, className: 'niveau-default' }
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
    + ' · '
    + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

const isAdmin = () => sessionStorage.getItem('role') === 'Administrateur'

// --- COMPOSANTS ENFANTS ---

function AlerteCard({ alerte, onSupprimer }) {
  const { label, className } = getBadgeConfig(alerte.idniveauAlerte)

  const handleSupprimer = async () => {
    if (!window.confirm(`Supprimer l'alerte "${alerte.titreAlerte}" ?`)) return
    const res = await supprimerAlerte(alerte.idAlerte)
    if (res?.message) onSupprimer()
  }

  return (
    <article className={`alerte-card ${className}`}>
      <div className="alerte-card__side-bar" />
      <div className="alerte-card__content">
        <header className="alerte-card__header">
          <span className={`alerte-badge ${className}`}>{label}</span>
          <span className="alerte-attraction">{alerte.libelleAttraction}</span>
          <time className="alerte-date">{formatDate(alerte.dateAlerte)}</time>
        </header>
        <h3 className="alerte-titre">{alerte.titreAlerte}</h3>
        <p className="alerte-description">{alerte.descriptionAlerte}</p>
        <footer className="alerte-card__footer">
          <span className="alerte-id">#{alerte.idAlerte}</span>
          {isAdmin() && (
        <button className="btn-supprimer-alerte" onClick={handleSupprimer}>
            <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
            Supprimer
        </button>
        )}
        </footer>
      </div>
    </article>
  )
}

function Modal_Ajouter({ fermerModal, rafraichir, attractions }) {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        
        const res = await ajouterAlerte(
            formData.get('titreAlerte'),
            formData.get('descriptionAlerte'),
            formData.get('idAttractionAlerte'),
            formData.get('idniveauAlerte')
        )

        if (res?.message === 'alerte ajoutée') {
            rafraichir()
            fermerModal()
        } else {
            alert(res?.message || "Erreur lors de l'ajout")
        }
    }

    return (
        <div className="modal" onClick={(e) => { if (e.target === e.currentTarget) fermerModal() }}>
            <div className="modal-content">
                <h2 className="modal-title">Nouvelle alerte</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label className="form-label">Titre</label>
                        <input className="form-input" type="text" name="titreAlerte" placeholder="Ex : Panne technique" required />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Attraction concernée</label>
                        <select className="form-select" name="idAttractionAlerte" required>
                            <option value="">Sélectionner une attraction</option>
                            {attractions.map(att => (
                                <option key={att.idAttraction} value={att.idAttraction}>{att.libelleAttraction}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Niveau de gravité</label>
                        <select className="form-select" name="idniveauAlerte" required>
                            <option value="1">Info</option>
                            <option value="2">Modéré</option>
                            <option value="3">Élevé</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <input className="form-input" type="text" name="descriptionAlerte" placeholder="Détails..." required />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={fermerModal}>Annuler</button>
                        <button type="submit" className="btn-add">Valider</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// --- COMPOSANT PRINCIPAL ---

function Alertes() {
  const [alertes, setAlertes] = useState([])
  const [attractions, setAttractions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtre, setFiltre] = useState('tous')
  const [recherche, setRecherche] = useState('')
  const [showModalAjouter, setShowModalAjouter] = useState(false)
  const [update, setUpdate] = useState(0)

  const rafraichir = () => setUpdate(u => u + 1)

  useEffect(() => {
    setLoading(true)
    Promise.all([GetAlertes(), getAttractions()])
      .then(([alertesData, attractionsData]) => {
        if (Array.isArray(alertesData)) setAlertes(alertesData)
        else setError(alertesData.message ?? 'Erreur inconnue')
        if (Array.isArray(attractionsData)) setAttractions(attractionsData)
        setLoading(false)
      })
      .catch(() => {
        setError('Erreur réseau')
        setLoading(false)
      })
  }, [update])

  const alertesFiltrees = alertes
    .filter(a => filtre === 'tous' || String(a.idniveauAlerte) === filtre)
    .filter(a =>
      recherche === '' ||
      a.titreAlerte?.toLowerCase().includes(recherche.toLowerCase()) ||
      a.libelleAttraction?.toLowerCase().includes(recherche.toLowerCase()) ||
      a.descriptionAlerte?.toLowerCase().includes(recherche.toLowerCase())
    )
    .sort((a, b) => new Date(b.dateAlerte) - new Date(a.dateAlerte))

  return (
    <div className="alertes-page">
      <div className="alertes-page__bg-grid" aria-hidden="true" />

      <header className="alertes-page__header">
        <div className="alertes-page__header-inner">
          <div className="alertes-page__title-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="alertes-page__pulse" aria-hidden="true" />
              <h1 className="alertes-page__title">Alertes</h1>
              <span className="alertes-total-badge">{alertes.length}</span>
            </div>
            <button className="btn-add" onClick={() => setShowModalAjouter(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Ajouter
            </button>
          </div>
        </div>
      </header>

      {!loading && !error && (
        <div className="alertes-controls">
          <input
            className="alertes-search"
            type="text"
            placeholder="Rechercher une alerte…"
            value={recherche}
            onChange={e => setRecherche(e.target.value)}
          />
          <div className="alertes-filters">
            <button className={`filter-btn ${filtre === 'tous' ? 'active' : ''}`} onClick={() => setFiltre('tous')}>Tous</button>
            <button className={`filter-btn niveau-4 ${filtre === '1' ? 'active' : ''}`} onClick={() => setFiltre('1')}>Info</button>
            <button className={`filter-btn niveau-3 ${filtre === '2' ? 'active' : ''}`} onClick={() => setFiltre('2')}>Modéré</button>
            <button className={`filter-btn niveau-1 ${filtre === '3' ? 'active' : ''}`} onClick={() => setFiltre('3')}>Élevé</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="alertes-loading">Chargement...</div>
      ) : error ? (
        <div className="alertes-error">{error}</div>
      ) : (
        <div className="alertes-list">
          {alertesFiltrees.map(alerte => (
            <AlerteCard key={alerte.idAlerte} alerte={alerte} onSupprimer={rafraichir} />
          ))}
        </div>
      )}

      {showModalAjouter && (
        <Modal_Ajouter 
            attractions={attractions}
            fermerModal={() => setShowModalAjouter(false)}
            rafraichir={rafraichir}
        />
      )}
    </div>
  )
}

export default Alertes