export const getMissions = async () => {
    try {
        const response = await fetch('http://localhost:3000/missions/getMissions', {
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