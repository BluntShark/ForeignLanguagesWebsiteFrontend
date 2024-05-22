import React, { useState, useEffect } from 'react';
import imgSrc from '../assets/chinchilla.png';

const HeaderComponent = () => {
  const username = localStorage.getItem('username');

  // useEffect(() => {
  //   const storedUsername = localStorage.getItem('username');
  //   console.log(storedUsername);
  //   if (storedUsername) {
  //     setUsername(storedUsername);
  //   }
  // }, []);

  return (
    <div>
      <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <img className= "imgLogo" src={imgSrc}/>
            <div className="headerLogo">
              <h2 className='text-center text-muted'> Chīsana chinchira</h2>
              <h4 className='text-center text-muted'> 小さなチンチラ</h4>
            </div>
            {/* <div>
            Welcome, {username}
            </div> */}
          </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;