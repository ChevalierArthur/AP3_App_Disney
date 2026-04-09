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

export const updateMission = async (titreMission, dateDebut, dateDebutReel, dateFin, Commentaire, id) => {
    try {
        const response = await fetch('http://localhost:3000/missions/updateMission', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ titreMission, dateDebut, dateDebutReel, dateFin, Commentaire, id })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur réseau ou serveur:', error);
        return { message: "Le serveur ne répond pas." };
    }
}

export const addMission = async (titreMission, dateDebut, dateFin) => {
    try {
        const response = await fetch('http://localhost:3000/missions/addMission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ titreMission, dateDebut, dateFin })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur réseau ou serveur:', error);
        return { message: "Le serveur ne répond pas." };
    }
}

export const deleteMission = async (id) => {
    try {
        const response = await fetch('http://localhost:3000/missions/deleteMission', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ id })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur réseau ou serveur:', error);
        return { message: "Le serveur ne répond pas." };
    }
}

