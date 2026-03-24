import { useState } from 'react'
import '../CSS/login.css'
import {connexionUtilisateur} from '../Services/Auth.js'

function Login() {
    const [response, setResponse] = useState('')
    const [message, setMessage] = useState('')
    const [Identifiant, setIdentifiant] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
    e.preventDefault()
    setResponse(connexionUtilisateur(Identifiant, password))
    if(response.message){
        setMessage(response.message)
    }
    else{
        sessionStorage.setItem('token', response.token)
    sessionStorage.setItem('identifiant', Identifiant)
    sessionStorage.setItem('role', response.role)
    setconnected(true)
    }
    
}

return (
    <>
    <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="identifiant">Identifiant:</label>
            <input
            type="text"
            id="identifiant"
            value={Identifiant}
            onChange={(e) => setIdentifiant(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="submit">Login</button>
        </form>
        <p>{response}</p>
    </div>
</>
)
}

export default Login
