import React, { useState } from 'react';
import '../components/Header/Header.css';
import img_logo from '../image/logo.png';

const Header = () => {
  const [selectedOption, setSelectedOption] = useState('OpenSource');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <header>
      <img src={img_logo} className="logo" alt="Wildlens Logo" />
      <div className='radio_IA'>
        <label className={`radio-label ${selectedOption !== 'WildlensIA' && 'transparent'}`}>
          <input 
            type="radio" 
            value="WildlensIA" 
            checked={selectedOption === 'WildlensIA'} 
            onChange={handleOptionChange} 
          />
          WildlensIA
        </label>
        <label className={`radio-label ${selectedOption !== 'OpenSource' && 'transparent'}`}>
          <input 
            type="radio" 
            value="OpenSource" 
            checked={selectedOption === 'OpenSource'} 
            onChange={handleOptionChange} 
          />
          OpenSource
        </label>
      </div>
    </header>
  );
};

export default Header;