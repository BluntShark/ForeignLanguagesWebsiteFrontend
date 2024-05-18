import React from 'react'
import {Link} from 'react-router-dom';
import './Home.css'
import '../App.css'

const Home = ({
    imgSrc,
    ingAlt,
    title,
    description
}) => {
  return (
    <div className='App'>
        <br /><br />
    <div className='card-container'>
        <Link to="/words">
        <img
          src={imgSrc}
          alt={ingAlt}
          className='card-image'
        />
      </Link>
        <h3 className='card-title'>{title}</h3>
        <p className='card-description'>{description}</p>
        <br />
    </div>
    <br /><br /><br /><br /><br />
    </div>
  )
}

export default Home