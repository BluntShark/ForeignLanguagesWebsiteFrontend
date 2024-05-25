import React, { useState } from 'react'

const LessonComponent = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dateOfCreation, setDateOfCreation] = useState('');
  const [duration, setDuration] = useState('');
  const [difficultlyLevel, setDifficultlyLevel] = useState('');
  const [lessonCategory, setLessonCategory] = useState('');


  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleDateOfCreation(e) {
    setDateOfCreation(e.target.value);
  }
  function handleDuration(e) {
    setDuration(e.target.value);
  }
  function saveLesson(e){
    e.preventDefault();
    const lesson = {title, dateOfCreation, duration}
    console.log(lesson);
  }

  return (
    <div className='container'>
      <br /><br />
      <div className='row'>
        <div className='card col-md-6 offset-md-4 offset-md-3'>
          <h2 className='text-center'>Создать урок</h2>
          <div className='card-body'>
            <form>

              <div className='form-group mb-2'>
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

              {/* <div className='form-group mb-2'>
                <label className='form-label'> Уровень сложости:</label>
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
                <label className='form-label'> Категория урока:</label>
                <input
                type='text'
                placeholder='Ввести название'
                name='title'
                value={title}
                className='form-control'
                onChange={handleTitle}
                ></input>
              </div> */}

              <button className='btn btn-success' onClick={saveLesson}> Отправить</button>
            </form>
          </div>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}

export default LessonComponent