import { useState, useEffect } from 'react'
import '../CSS/Alertes.css'
import { GetAlertes } from '../Services/Alertes'

const NIVEAU_CONFIG = {
  1: { label: 'Info',   className: 'niveau-4'},
  2: { label: 'Modéré',      className: 'niveau-2'},
  3: { label: 'Élevé',     className: 'niveau-1'}
}

function getBadgeConfig(niveau) {
  return NIVEAU_CONFIG[niveau] ?? { label: `N${niveau}`, className: 'niveau-default', icon: '◌' }
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
    + ' · '
    + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

function AlerteCard({ alerte }) {
  const { label, className, icon } = getBadgeConfig(alerte.idniveauAlerte)
  return (
    <article className={`alerte-card ${className}`}>
      <div className="alerte-card__side-bar" />
      <div className="alerte-card__content">
        <header className="alerte-card__header">
          <span className={`alerte-badge ${className}`}>
            <span className="alerte-badge__icon">{icon}</span>
            {label}
          </span>
          <span className="alerte-attraction">{alerte.libelleAttraction}</span>
          <time className="alerte-date">{formatDate(alerte.dateAlerte)}</time>
        </header>
        <h3 className="alerte-titre">{alerte.titreAlerte}</h3>
        <p className="alerte-description">{alerte.descriptionAlerte}</p>
        <footer className="alerte-card__footer">
          <span className="alerte-id">#{alerte.idAlerte}</span>
        </footer>
      </div>
    </article>
  )
}

function StatBar({ alertes }) {
  const counts = alertes.reduce((acc, a) => {
    acc[a.idniveauAlerte] = (acc[a.idniveauAlerte] || 0) + 1
    return acc
  }, {})

  return (
    <div className="stat-bar">
      {Object.entries(NIVEAU_CONFIG).map(([n, { label, className, icon }]) => (
        <div key={n} className={`stat-item ${className}`}>
          <span className="stat-icon">{icon}</span>
          <span className="stat-count">{counts[Number(n)] ?? 0}</span>
          <span className="stat-label">{label}</span>
        </div>
      ))}
    </div>
  )
}

function Alertes() {
  const [alertes, setAlertes]       = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [filtre, setFiltre]         = useState('tous')
  const [recherche, setRecherche]   = useState('')

  useEffect(() => {
    GetAlertes().then(data => {
      if (Array.isArray(data)) {
        setAlertes(data)
      } else {
        setError(data.message ?? 'Erreur inconnue')
      }
      setLoading(false)
    })
  }, [])

  const alertesFiltrees = alertes
    .filter(a => filtre === 'tous' || String(a.idniveauAlerte) === filtre)
    .filter(a =>
      recherche === '' ||
      a.titreAlerte?.toLowerCase().includes(recherche.toLowerCase()) ||
      a.libelleAttraction?.toLowerCase().includes(recherche.toLowerCase()) ||
      a.descriptionAlerte?.toLowerCase().includes(recherche.toLowerCase())
    )
    .sort((a, b) => a.idniveauAlerte - b.idniveauAlerte || new Date(b.dateAlerte) - new Date(a.dateAlerte))

  return (
    <div className="alertes-page">
      <div className="alertes-page__bg-grid" aria-hidden="true" />

      <header className="alertes-page__header">
        <div className="alertes-page__header-inner">
          <div className="alertes-page__title-row">
            <span className="alertes-page__pulse" aria-hidden="true" />
            <h1 className="alertes-page__title">Alertes</h1>
            <span className="alertes-total-badge">{alertes.length}</span>
          </div>
        </div>
      </header>

      {loading && (
        <div className="alertes-loading">
          <span className="alertes-loading__spinner" />
          Chargement des alertes…
        </div>
      )}

      {error && (
        <div className="alertes-error">
          <span className="alertes-error__icon">!</span>
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && (
        <>
          <StatBar alertes={alertes} />

          <div className="alertes-controls">
            <input
              className="alertes-search"
              type="text"
              placeholder="Rechercher une alerte…"
              value={recherche}
              onChange={e => setRecherche(e.target.value)}
            />
            <div className="alertes-filters">
              <button
                className={`filter-btn ${filtre === 'tous' ? 'active' : ''}`}
                onClick={() => setFiltre('tous')}
              >
                Tous
              </button>
              {Object.entries(NIVEAU_CONFIG).map(([n, { label, className }]) => (
                <button
                  key={n}
                  className={`filter-btn ${className} ${filtre === n ? 'active' : ''}`}
                  onClick={() => setFiltre(n)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {alertesFiltrees.length === 0 ? (
            <div className="alertes-empty">
              <span className="alertes-empty__icon">✓</span>
              <p>Aucune alerte correspondante</p>
            </div>
          ) : (
            <div className="alertes-list">
              {alertesFiltrees.map(alerte => (
                <AlerteCard key={alerte.idAlerte} alerte={alerte} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Alertes