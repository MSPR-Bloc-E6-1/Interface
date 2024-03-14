import React, { useEffect, useState } from 'react';
import '../components/Explication/Explication.css';
import { useParams } from 'react-router-dom';

function Explication() {
    const { topic } = useParams();
    const imageUrl = require(`../image-animaux/${topic}.jpg`);
    
    const [NameAnimal, setNameAnimal] = useState('');
    const [DescripAnimal, setDescripAnimal] = useState('');
    const [FamilleAnimal, setFamilleAnimal] = useState('');
    const [TailleAnimal, setTailleAnimal] = useState('');
    const [HabitatAnimal, setHabitatAnimal] = useState('');

    useEffect(() => {
        // Récupérer les données du stockage local
        const storedNameAnimal = localStorage.getItem('NameAnimal');
        const storedDescripAnimal = localStorage.getItem('DescripAnimal');
        const storedFamilleAnimal = localStorage.getItem('FamilleAnimal');
        const storedTailleAnimal = localStorage.getItem('TailleAnimal');
        const storedHabitatAnimal = localStorage.getItem('HabitatAnimal');

        if (storedNameAnimal || storedDescripAnimal || storedFamilleAnimal || storedTailleAnimal || storedHabitatAnimal) {
            setNameAnimal(storedNameAnimal);
            setDescripAnimal(storedDescripAnimal);
            setFamilleAnimal(storedFamilleAnimal);
            setTailleAnimal(storedTailleAnimal);
            setHabitatAnimal(storedHabitatAnimal);
        }
    }, []);

    // Enregistrement des données dans le stockage local
    useEffect(() => {
        localStorage.setItem('NameAnimal', NameAnimal);
        localStorage.setItem('DescripAnimal', DescripAnimal);
        localStorage.setItem('FamilleAnimal', FamilleAnimal);
        localStorage.setItem('TailleAnimal', TailleAnimal);
        localStorage.setItem('HabitatAnimal', HabitatAnimal);
    }, [NameAnimal, DescripAnimal, FamilleAnimal, TailleAnimal, HabitatAnimal]);

    return (
        <div className='container_explication'>
            <div className='block_explication'>
                <div className='head_image_titre_animal'>
                    <div className='container_img_animal'>
                        <img src={imageUrl} alt={topic} className='img_animal_explication' />
                    </div>
                    <div className='tite_texte_animal'>
                        <h1>{NameAnimal}</h1>
                        <p>{DescripAnimal}</p>
                    </div>
                </div>
                
                <div className='tite_texte_animal'>
                    <h1>Famille</h1>
                    <p>{FamilleAnimal}</p>
                </div>
                
                <div className='tite_texte_animal'>
                    <h1>Taille</h1>
                    <p>{TailleAnimal}</p>
                </div>
                
                <div className='tite_texte_animal'>
                    <h1>Habitat</h1>
                    <p>{HabitatAnimal}</p>
                </div>
            </div>
        </div>
    );
}

export default Explication;
