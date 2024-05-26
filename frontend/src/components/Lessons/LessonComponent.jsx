import React, {useState, useEffect} from 'react'
import { createLesson, getLesson, listDifficultyLevels, listLessonCategories, updateLesson } from '../../services/LessonService';
import { useNavigate, useParams } from 'react-router-dom';


const LessonComponent = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dateOfCreation, setDateOfCreation] = useState('');
  const [duration, setDuration] = useState('');
  const [difficultlyLevel, setDifficultlyLevel] = useState('');
  const [lessonCategory, setLessonCategory] = useState('');
  const [difficultyLevels, setDifficultyLevels] = useState([]);
  const [lessonCategories, setLessonCategories] = useState([]);

  const [errors, setErrors] = useState({
    title: '',
    content: '',
    dateOfCreation: '',
    duration: ''
  })

  const navigator = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    if(id){
      getLesson(id).then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setDateOfCreation(response.data.dateOfCreation);
        setDuration(response.data.duration);
        setDifficultlyLevel(response.data.difficultlyLevel);
        setLessonCategory(response.data.lessonCategory);
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id])

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

  function saveOrUpdateLesson(e){
    e.preventDefault();

    if(validateForm()){
      const lesson = { title, content, dateOfCreation, duration, difficultlyLevel, lessonCategory }
      console.log(lesson);

      if(id){
        updateLesson(id, lesson).then((response) => {
          console.log(response.data);
          navigator('/lessons');
        }).catch(error => {
          console.error(error);
        })
      } else {
        createLesson(lesson).then((response) => {
          console.log(response.data);
          navigator('/lessons');
        }).catch(error => {
          console.error(error);
        })
      }

    }
  }

  function validateForm(){
    let valid = true;

    const errorsCopy = {... errors}

    if(title.trim()){
      errorsCopy.title = '';
    } else{
      errorsCopy.title = 'Необходимо написать название';
      valid = false;
    }

    if(content.trim()){
      errorsCopy.content = '';
    } else{
      errorsCopy.content = 'Необходимо написать урок';
      valid = false;
    }

    if(dateOfCreation.trim()){
      errorsCopy.dateOfCreation = '';
    } else{
      errorsCopy.dateOfCreation = 'Необходимо написать дату создания';
      valid = false;
    }

    if(duration.trim()){
      errorsCopy.duration = '';
    } else{
      errorsCopy.duration = 'Необходимо написать длительность';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;

  }

  function pageTitle(){
    if(id){
      return <h2 className='text-center'>Редактировать урок</h2>
    }
    else {
      return <h2 className='text-center'>Создать урок</h2>
    }
  }

  return (
    <div className='container'>
      <br /><br />
      <div className='row '>
        <div className='card-lesson col-md-6 offset-md-4 offset-md-3'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form>
            <div className='form-group mb-2 '>
                <label className='form-label'> Название урока:</label>
                <input
                type='text'
                placeholder='Ввести название'
                name='title'
                value={title}
                className={errors.title ? 'is-invalid form-control' : 'form-control'}
                onChange={handleTitle}
                ></input>
                {errors.title && <div className='invalid-feedback'> {errors.title}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'> Дата создания:</label>
                <input
                type='text'
                placeholder='Ввести дату создания'
                name='dateOfCreation'
                value={dateOfCreation}
                className={errors.dateOfCreation ? 'is-invalid form-control' : 'form-control'}
                onChange={handleDateOfCreation}
                ></input>
                {errors.dateOfCreation && <div className='invalid-feedback'> {errors.dateOfCreation}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'> Длительность урока:</label>
                <input
                type='text'
                placeholder='Ввести длиетльность урока'
                name='duration'
                value={duration}
                className={errors.duration ? 'is-invalid form-control' : 'form-control'}
                onChange={handleDuration}
                ></input>
                {errors.duration && <div className='invalid-feedback'> {errors.duration}</div>}
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
                value={content}
                className={errors.content ? 'is-invalid form-control' : 'form-control'}
                onChange={handleContent}
                ></input>
                {errors.content && <div className='invalid-feedback'> {errors.content}</div>}
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button className='btn btn-secondary border-radius-sm' onClick={saveOrUpdateLesson}> Отправить</button>
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