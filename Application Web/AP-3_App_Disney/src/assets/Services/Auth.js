export const connexionUtilisateur = (login, mdp) => {
    return fetch('http://localhost:3000/api/Auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, mdp })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            sessionStorage.setItem('token', data.token);
            console.log('Login successful');
        } else {
            console.error('Login failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    return response.json();
}