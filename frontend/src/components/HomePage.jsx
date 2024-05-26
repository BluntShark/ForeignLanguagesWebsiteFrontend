import React from 'react';
import Home from './Home';
import '../App.css';
import dictionaryPicture from '../assets/dictionary.jpg';
import lessonsPicture from '../assets/lessons.jpg';
import testPicture from '../assets/tests.jpg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const HomePage = () => {
  return (
    <div className='App'>
      <div className='cards-wrapper'>
        <Home 
          imgSrc={dictionaryPicture}
          linkComp={"/words"}
          ingAlt={"Dictionary"}
          title={"Словарь"}
          description={"Слова, перевод и примеры"}
        />
        <Home 
          imgSrc={lessonsPicture}
          linkComp={"/lessons"}
          ingAlt={"Lessons"}
          title={"Уроки"}
          description={"Учите веселые уроки"}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
