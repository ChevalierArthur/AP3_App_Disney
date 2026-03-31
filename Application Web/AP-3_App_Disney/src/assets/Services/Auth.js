export const connexionUtilisateur = async (login, mdp) => {
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, mdp })
        });
        const data = await response.json();
        return data; 

    } catch (error) {
        console.error('Erreur réseau ou serveur:', error);
        return { message: "Le serveur ne répond pas." };
    }
}
export const verify = async () => {
    try {
        const response = await fetch('http://localhost:3000/auth/verify', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur réseau ou serveur:', error);
        return { message: "Le serveur ne répond pas." };
    }
}
