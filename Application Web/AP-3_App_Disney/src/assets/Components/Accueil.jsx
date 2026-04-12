import { NavLink } from 'react-router-dom';
import '../CSS/Accueil.css'; // Crée ce fichier pour le style

function Accueil() {
  const cards = [
    {
      title: 'Attractions',
      path: '/attractions',
      className: 'card-attractions'
    },
    {
      title: 'Missions',
      path: '/missions',
      className: 'card-missions'
    },
    {
      title: 'Alertes',
      path: '/alertes',
      className: 'card-alertes'
    }
  ];

  return (
    <div className="accueil-container">
      <div className="accueil-grid">
        {cards.map((card, index) => (
          <NavLink 
            key={index} 
            to={card.path} 
            className={`accueil-card ${card.className}`}
          >
            <div className="card-overlay">
              <h2>{card.title}</h2>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Accueil;