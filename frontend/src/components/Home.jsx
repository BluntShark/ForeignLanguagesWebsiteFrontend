import React from 'react'
import {Link} from 'react-router-dom';
import dictionaryPicture from '../assets/dictionary.jpg'
import './Home.css'
import '../App.css'

const Home = () => {
  return (
    <div className='App'>
        <br /><br />
    <div className='card-container'>
        <Link to="/words">
        <img
          src={dictionaryPicture}
          alt='Dictionary'
          className='card-image'
        />
      </Link>
        <h3 className='card-title'>Словарь</h3>
        <h9 className='card-description'>Содержит слова, перевод и примеры</h9>
    </div>
    <br /><br /><br /><br /><br />
    </div>
    
  )
}

export default Home