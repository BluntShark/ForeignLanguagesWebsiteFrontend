import React, { useEffect, useState } from 'react'
import { createLesson, listDifficultyLevels, listLessonCategories } from '../../services/LessonService';
import { useNavigate } from 'react-router-dom';
import parser from 'bbcode-to-react';

const LessonComponent = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dateOfCreation, setDateOfCreation] = useState('');
  const [duration, setDuration] = useState('');
  const [difficultlyLevel, setDifficultlyLevel] = useState('');
  const [lessonCategory, setLessonCategory] = useState('');
  const [difficultyLevels, setDifficultyLevels] = useState([]);
  const [lessonCategories, setLessonCategories] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    listDifficultyLevels()
      .then(response => setDifficultyLevels(response.data))
      .catch(error => console.error('Error fetching difficulty levels:', error));

      listLessonCategories()
      .then(response => setLessonCategories(response.data))
      .catch(error => console.error('Error fetching lesson categories:', error));
  }, []);


  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleDateOfCreation(e) {
    setDateOfCreation(e.target.value);
  }
  function handleDuration(e) {
    setDuration(e.target.value);
  }
  function handleDifficultlyLevel(e) {
    const selectLevel = difficultyLevels.find(level => level.id == e.target.value);
    console.log(selectLevel);
    setDifficultlyLevel(selectLevel);
  }
  function handleLessonCategory(e) {
    const selectCategory = lessonCategories.find(category => category.id == e.target.value)
    console.log(selectCategory);
    setLessonCategory(selectCategory);
  }
  function handleContent(e) {
    setContent(e.target.value);
  }

  function saveLesson(e){
    e.preventDefault();
    const lesson = { title, content, dateOfCreation, duration, difficultlyLevel, lessonCategory }
    console.log(lesson);

    createLesson(lesson).then((response) => {
      console.log(response.data);
      navigator('/lessons');
    })
  }

  return (
    <div className='container'>
      <br /><br />
      <div className='row '>
        <div className='card-lesson col-md-6 offset-md-4 offset-md-3'>
          <h2 className='text-center'>Создать урок</h2>
          <div className='card-body'>
            <form>

            <div className='form-group mb-2 '>
                <label className='form-label'> Название урока:</label>
                <input
                type='text'
                placeholder='Ввести название'
                name='title'
                value={title}
                className='form-control'
                onChange={handleTitle}
                ></input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'> Дата создания:</label>
                <input
                type='text'
                placeholder='Ввести дату создания'
                name='dateOfCreation'
                value={dateOfCreation}
                className='form-control'
                onChange={handleDateOfCreation}
                ></input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'> Длительность урока:</label>
                <input
                type='text'
                placeholder='Ввести длиетльность урока'
                name='duration'
                value={duration}
                className='form-control'
                onChange={handleDuration}
                ></input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Уровень сложности:</label>
                <select
                  name='difficultlyLevel'
                  value={difficultlyLevel}
                  className='form-select'
                  onChange={handleDifficultlyLevel}
                >
                  <option value=''>Выберите уровень сложности</option>
                  {difficultyLevels.map(level => (
                    <option key={level.id} value={level.id}>{level.level}</option>
                  ))}
                </select>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Категория урока:</label>
                <select
                  name='lessonCategory'
                  value={lessonCategory}
                  className='form-select'
                  onChange={handleLessonCategory}
                >
                  <option value=''>Выберите категорию урока</option>
                  {lessonCategories.map(category => (
                    <option key={category.id} value={category.id}>{category.title}</option>
                  ))}
                </select>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'> Контент:</label>
                <input
                type='text'
                placeholder='Введите контент урока'
                name='content'
                // value={content}
                value={content}
                className='form-control'
                onChange={handleContent}
                ></input>
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button className='btn btn-secondary border-radius-sm' onClick={saveLesson}> Отправить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}

export default LessonComponent