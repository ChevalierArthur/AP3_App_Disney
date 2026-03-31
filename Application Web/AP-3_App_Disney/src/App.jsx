import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Login from './assets/Components/login.jsx'


function App() {
  const [connected, setConnected] = useState(false)
  if (sessionStorage.getItem('token')) {
    function deconnecter() {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('identifiant')
  sessionStorage.removeItem('role')
  setConnected(false)
}
    return (<>
    
      <button onClick={deconnecter}>
        Déconnexion
      </button></>

    )
  }
  else{
    return (
      <Login connected={setConnected}/>
    )
  }
  <Router></Router>
}

export default App
