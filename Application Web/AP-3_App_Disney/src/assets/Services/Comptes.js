export const recupererComptes = async () => {
    try {
        const response = await fetch('http://localhost:3000/users/getUsers', {
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
export const ajouterCompte = async (nom, prenom, identifiant, motDePasse, idEquipe) => {
    try {
        const response = await fetch('http://localhost:3000/users/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ nom, prenom, identifiant, motDePasse, idEquipe})
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur réseau ou serveur:', error);
        return { message: "Le serveur ne répond pas." };
    }
}
export const modifierCompte = async (id, nom, prenom, identifiant, motDePasse, idEquipe) => {
    try {
        const response = await fetch(`http://localhost:3000/users/updateUser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ id, nom, prenom, identifiant, motDePasse, idEquipe })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur réseau ou serveur:', error);
        return { message: "Le serveur ne répond pas." };
    }
}