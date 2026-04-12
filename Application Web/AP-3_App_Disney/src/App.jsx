import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Login from './assets/Components/login.jsx'
import Headers from './assets/Components/Header.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import Comptes from './assets/Components/Comptes.jsx'
import Attraction from './assets/Components/Attraction.jsx'
import Mission from './assets/Components/Mission.jsx'
import Alertes from './assets/Components/Alertes.jsx'
function App() {
  const [connected, setConnected] = useState(false)


if (sessionStorage.getItem('token')) {

function deconnecter() {
sessionStorage.removeItem('token')
sessionStorage.removeItem('identifiant')
sessionStorage.removeItem('role')
setConnected(false)
location.href = '/'
}
    return (<>
    <Router>
      <Headers deconnecter={deconnecter} />
      <Routes>
        <Route path="/accueil" element={<h1>Accueil</h1>} />
        <Route path="/missions" element={<Mission />} />
        <Route path="/alertes" element={<Alertes />} />
        {sessionStorage.getItem('role') === 'Administrateur' && (
          <>
            <Route path="/comptes" element={ <Comptes />} />
          </>
        )}
        <Route path="/attractions" element={ <Attraction />} />
      </Routes>
</Router>
</>
    )
  }
  else{
    

    return (
      <Login connected={setConnected}/>
    )
  }
}

export default App
