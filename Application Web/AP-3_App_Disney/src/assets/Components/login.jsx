import { useState } from 'react'
import '../CSS/login.css'
import {connexionUtilisateur} from '../Services/Auth.js'

function Login({connected}) {
    const [response, setResponse] = useState('')
    const [message, setMessage] = useState('')
    const [Identifiant, setIdentifiant] = useState('')
    const [password, setPassword] = useState('')

const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setResponse('');

    try {
        const data = await connexionUtilisateur(Identifiant, password);

        if (data && data.token) {
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('identifiant', Identifiant);
            sessionStorage.setItem('role', data.role);
            setMessage('Login successful');
            if (connected) connected(true);
        } else {
            setMessage(data?.message || "Identifiants incorrects ou erreur serveur.");
            console.log('Login failed:', data);
        }
    } catch (err) {
        setMessage("Impossible de contacter le serveur.");
    }
};

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
        <p>{message}</p>
    </div>
</>
)
}

export default Login
