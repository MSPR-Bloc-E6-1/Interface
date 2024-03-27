import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/Chargement/Chargement.css';

function Chargement() {
    const [Prediction, setPrediction] = useState('');
    useEffect(() => {
        const storedPrediction = localStorage.getItem('prediction');
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
            const NameAnimal = response.data[0].nom;
            const DescripAnimal = response.data[0].description;
            const ImageAnimal = response.data[0].imageAnimal;
            const FamilleAnimal = response.data[0].famille;
            const TailleAnimal = response.data[0].taille;
            const HabitatAnimal = response.data[0].habitat;

            localStorage.setItem('NameAnimal', NameAnimal);
            localStorage.setItem('DescripAnimal', DescripAnimal);
            localStorage.setItem('ImageAnimal', ImageAnimal);
            localStorage.setItem('FamilleAnimal', FamilleAnimal);
            localStorage.setItem('TailleAnimal', TailleAnimal);
            localStorage.setItem('HabitatAnimal', HabitatAnimal);

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
