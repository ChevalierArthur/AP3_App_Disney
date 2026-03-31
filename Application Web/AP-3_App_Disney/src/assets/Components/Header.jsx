import { NavLink, useNavigate } from 'react-router-dom'
import '../CSS/header.css'
import { verify } from '../Services/Auth'

function Header(deconnecter) {
    const navigate = useNavigate()

        function verifierToken() {
        verify().then(data => {
        if (data.message == 'token valide') { console.log('Token valide')
        } else {
            console.log('Token invalide ou expiré:', data)
            deconnecter.deconnecter()
        }
        })
    }

    const handleLogout = () => {
        deconnecter.deconnecter()
    }

    return (
        <>
            <header className="header">
                {/* Logo */}
                <NavLink to="/accueil" className="header-logo">
                    <div className="header-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                        </svg>
                    </div>
                </NavLink>

                {/* Navigation */}
                <nav className="header-nav">
                    <NavLink to="/accueil" onClick={() => verifierToken()} className={({ isActive }) => isActive ? 'active' : ''}>
                        Accueil
                    </NavLink>
                    <NavLink to="/missions" onClick={() => verifierToken()} className={({ isActive }) => isActive ? 'active' : ''}>
                        Missions
                    </NavLink>
                    <NavLink to="/alertes" onClick={() => verifierToken()} className={({ isActive }) => isActive ? 'active' : ''}>
                        Alertes
                    </NavLink>
                    <NavLink to="/comptes" onClick={() => verifierToken()} className={({ isActive }) => isActive ? 'active' : ''}>
                        Comptes
                    </NavLink>
                </nav>

                {/* Déconnexion */}
                <button className="header-logout" onClick={handleLogout} title="Déconnexion">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </button>
            </header>

            {/* Barre décorative */}
            <div className="header-subbar" />
        </>
    )
}

export default Header