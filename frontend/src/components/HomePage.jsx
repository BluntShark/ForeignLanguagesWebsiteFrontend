import React from 'react';
import Home from './Home';
import '../App.css';
import dictionaryPicture from '../assets/dictionary.jpg';
import lessonsPicture from '../assets/lessons.jpg';
import testPicture from '../assets/tests.jpg';

export const HomePage = () => {
  return (
    <div className='App'>
      <div className='cards-wrapper'>
        <Home 
          imgSrc={dictionaryPicture}
          ingAlt={"Dictionary"}
          title={"Словарь"}
          description={"Слова, перевод и примеры"}
        />
        <Home 
          imgSrc={lessonsPicture}
          ingAlt={"Lessons"}
          title={"Уроки"}
          description={"Учите веселые уроки"}
        />
        <Home 
          imgSrc={testPicture}
          ingAlt={"Tests"}
          title={"Тесты"}
          description={"Проходите веселые тесты"}
        />
      </div>
    </div>
  );
};

export default HomePage;
