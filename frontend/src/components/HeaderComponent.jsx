import React, { useState, useEffect } from 'react';
import imgSrc from '../assets/chinchilla.png';

const HeaderComponent = () => {

  return (
    <div>
      <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
            <img className= "imgLogo" src={imgSrc}/>
            <div className="headerLogo">
              <h2 className='text-center text-muted'> Chīsana chinchira</h2>
              <h4 className='text-center text-muted'> 小さなチンチラ</h4>
            </div>
          </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;