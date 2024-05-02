import React, { useEffect, useState } from 'react';
import '../components/Explication/Explication.css';
import { useParams } from 'react-router-dom';

function Explication() {
    const { topic } = useParams();
    
    const [animalData, setAnimalData] = useState({
        NameAnimal: '',
        DescripAnimal: '',
        ImageAnimal: '',
        FamilleAnimal: '',
        TailleAnimal: '',
        HabitatAnimal: ''
    });

    useEffect(() => {
        const storedAnimalData = JSON.parse(localStorage.getItem('AnimalData'));
        if (storedAnimalData) {
            setAnimalData(storedAnimalData);
        }
    }, []);

    return (
        <div className='container_explication'>
            <div className='block_explication'>
                <div className='head_image_titre_animal'>
                    <div className='container_img_animal'>
                        <img src={"data:image/png;base64," + animalData.ImageAnimal} alt={topic} className='img_animal_explication' />
                    </div>
                    <div className='tite_texte_animal'>
                        <h1>{animalData.NameAnimal}</h1>
                        <p>{animalData.DescripAnimal}</p>
                    </div>
                </div>
                
                <div className='tite_texte_animal'>
                    <h1>Famille</h1>
                    <p>{animalData.FamilleAnimal}</p>
                </div>
                
                <div className='tite_texte_animal'>
                    <h1>Taille</h1>
                    <p>{animalData.TailleAnimal}</p>
                </div>
                
                <div className='tite_texte_animal'>
                    <h1>Habitat</h1>
                    <p>{animalData.HabitatAnimal}</p>
                </div>
            </div>
        </div>
    );
}

export default Explication;
