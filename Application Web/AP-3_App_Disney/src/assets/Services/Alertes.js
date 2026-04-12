export const GetAlertes = async() => {
    try {
        const response = await fetch('http://localhost:3000/alertes/getAlertes', {
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
export const ajouterAlerte = async (TitreAlerte, DescriptionAlerte, IdAttractionAlerte, IdniveauAlerte) => {
    try {
        const response = await fetch('http://localhost:3000/Alertes/addAlerte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ titreAlerte: TitreAlerte, descriptionAlerte: DescriptionAlerte, dateAlerte: new Date(), idAttractionAlerte: IdAttractionAlerte, idniveauAlerte: IdniveauAlerte })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur réseau ou serveur:', error);
        return { message: "Le serveur ne répond pas." };
    }
}
export const supprimerAlerte = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/Alertes/deleteAlerte`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ id: id })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur réseau ou serveur:', error);
        return { message: "Le serveur ne répond pas." };
    }
}