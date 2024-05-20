import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/Chargement/Chargement.css';

function Chargement() {
    const [Prediction, setPrediction] = useState('');
    useEffect(() => {
        const storedPrediction = localStorage.getItem('prediction');
        console.log(storedPrediction)
        if (storedPrediction) {
            setPrediction(storedPrediction);
            localStorage.removeItem('prediction');
            // Appeler recuperation directement avec storedPrediction
            recuperation(storedPrediction);
        }
    }, []);

    const recuperation = async (animal) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/explication/animals?name=${animal}`);
        const nomAnimal = response.data[0].nom.toLowerCase().replace('-', '');

        const animalData = {
            'NameAnimal': response.data[0].nom,
            'DescripAnimal': response.data[0].description,
            'ImageAnimal': response.data[0].imageAnimal,
            'FamilleAnimal': response.data[0].famille,
            'TailleAnimal': response.data[0].taille,
            'HabitatAnimal': response.data[0].habitat
        };

        localStorage.setItem('AnimalData', JSON.stringify(animalData));
        
        window.location.href = '/explication/' + nomAnimal;

    } catch (error) {
        console.error('Erreur lors de la récupération :', error);
    }
};

    return (
        <div className='container_chargement'>
        </div>
    );
}

export default Chargement;
