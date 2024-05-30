Листинг А.1 ‒ App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import HomePage from './components/HomePage';
import ListWordsComponent from './components/Words/ListWordsComponent';
import WordsComponent from './components/Words/WordsComponent';
import LoginAndRegistrationWindow from './components/Auth/LoginAndRegistrationWindow';
import PrivateRoute from './components/Auth/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListLessonsComponent from './components/Lessons/ListLessonsComponent';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LessonComponent from './components/Lessons/LessonComponent';
import LessonDetailComponent from './components/Lessons/LessonDetailComponent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const role = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');
    setIsAuthenticated(auth === 'true');
    setUserRole(role);
    setUsername(username);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route
            path='/'
            element={isAuthenticated ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path='/auth'
            element={<LoginAndRegistrationWindow setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />}
          />
          <Route
            path='/words'
            element={<PrivateRoute element={<ListWordsComponent userRole={userRole} />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/lessons'
            element={<PrivateRoute element={<ListLessonsComponent userRole={userRole} />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/lessons/:id'
            element={<PrivateRoute element={<LessonDetailComponent userRole={userRole} />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/add-word'
            element={<PrivateRoute element={<WordsComponent />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/add-lesson'
            element={<PrivateRoute element={<LessonComponent />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/update-word/:id'
            element={<PrivateRoute element={<WordsComponent />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/update-lesson/:id'
            element={<PrivateRoute element={<LessonComponent />} isAuthenticated={isAuthenticated} />}
          />
        </Routes>
        {/* <FooterComponent /> */}
        <ToastContainer transition={Zoom}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
Листинг А.2 ‒ListLessonComponent.jsx
import React, {useState, useEffect} from 'react'
import { deleteLesson, listLessons } from '../../services/LessonService'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListLessonsComponent = ({ userRole }) => {

    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllLessons();
    }, [])

    function getAllLessons(){
        listLessons().then((response) => {
            setLessons(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const viewContent = (lessonId) => {
        console.log(lessonId);
        navigate(`/lessons/${lessonId}`);
    }
    const addNewLesson = () => {
        navigate('/add-lesson');
    }
    const updateLesson = (id) => {
        navigate(`/update-lesson/${id}`);
    }
    const removeLesson = (id) => {
        console.log(id);
        deleteLesson(id).then((response) => {
            console.log(response.data);
            getAllLessons();
          }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='container'>
        <h2 className='text-center'>Список уроков</h2>
        {userRole === 'ROLE_ADMIN' && (
                <button className='btn btn-secondary mb-2' onClick={addNewLesson}> Создать урок</button>
            )}
        <table className='table table-bordered table-success table-striped table table-hover'>
            <thead className='table-dark'>
                <tr>
                    <th>Название</th>
                    <th>Дата создания</th>
                    <th>Длительность</th>
                    <th>Уровень сложности</th>
                    <th>Категория урока</th>
                    {userRole === 'ROLE_ADMIN' && ( <th>Действия</th> )}
                </tr>
            </thead>
            <tbody>
                {
                    lessons.map(lesson =>
                        <tr key={lesson.id}>
                            <td onClick={() => viewContent(lesson.id)}>{lesson.title}</td>
                            <td onClick={() => viewContent(lesson.id)}>{lesson.dateOfCreation}</td>
                            <td onClick={() => viewContent(lesson.id)}>{lesson.duration}</td>
                            {lesson.difficultlyLevel && (
                                <td onClick={() => viewContent(lesson.id)}>{lesson.difficultlyLevel.level}</td>
                            )}
                            {lesson.lessonCategory && (
                                <td onClick={() => viewContent(lesson.id)}>{lesson.lessonCategory.title}</td>
                            )}
                            {userRole === 'ROLE_ADMIN' && 
                            <td style={{textAlign: 'center'}}> 
                                <button className='btn btn-secondary btn-sm' onClick={() => updateLesson(lesson.id)}> Изменить урок</button>
                                <button className='btn btn-dark btn-sm' onClick={() => removeLesson(lesson.id)}
                                    style={{marginLeft: '10px'}}
                                > Удалить урок</button>
                            </td>}
                        </tr> 
                    )
                }
            </tbody>
        </table>
        <ToastContainer 
            transition={Zoom}
            />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}

export default ListLessonsComponent
Листинг А.3 ‒LessonComponent.jsx
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
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getLesson(id)
        .then((response) => {
          console.log('Lesson data:', response.data); // Отладочный вывод
          setTitle(response.data.title);
          setContent(response.data.content);
          setDateOfCreation(response.data.dateOfCreation);
          setDuration(response.data.duration);
          setDifficultlyLevel(response.data.difficultlyLevel);
          setLessonCategory(response.data.lessonCategory);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  useEffect(() => {
    listDifficultyLevels()
      .then((response) => setDifficultyLevels(response.data))
      .catch((error) => console.error('Error fetching difficulty levels:', error));

    listLessonCategories()
      .then((response) => setLessonCategories(response.data))
      .catch((error) => console.error('Error fetching lesson categories:', error));
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
    const selectLevel = difficultyLevels.find((level) => level.id == e.target.value);
    console.log(selectLevel);
    setDifficultlyLevel(selectLevel);
  }

  function handleLessonCategory(e) {
    const selectCategory = lessonCategories.find((category) => category.id == e.target.value);
    console.log(selectCategory);
    setLessonCategory(selectCategory);
  }

  function handleContent(e) {
    setContent(e.target.value);
  }

  function saveOrUpdateLesson(e) {
    e.preventDefault();

    if (validateForm()) {
      const lesson = { title, content, dateOfCreation, duration, difficultlyLevel, lessonCategory };
      console.log(lesson);

      if (id) {
        updateLesson(id, lesson)
          .then((response) => {
            console.log(response.data);
            navigate('/lessons');
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createLesson(lesson)
          .then((response) => {
            console.log(response.data);
            navigate('/lessons');
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (title.trim()) {
      errorsCopy.title = '';
    } else {
      errorsCopy.title = 'Необходимо написать название';
      valid = false;
    }

    if (content.trim()) {
      errorsCopy.content = '';
    } else {
      errorsCopy.content = 'Необходимо написать урок';
      valid = false;
    }

    if (dateOfCreation.trim()) {
      errorsCopy.dateOfCreation = '';
    } else {
      errorsCopy.dateOfCreation = 'Необходимо написать дату создания';
      valid = false;
    }

    if (duration.trim()) {
      errorsCopy.duration = '';
    } else {
      errorsCopy.duration = 'Необходимо написать длительность';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className='text-center'>Редактировать урок</h2>;
    } else {
      return <h2 className='text-center'>Создать урок</h2>;
    }
  }

  return (
    <div className='container'>
      <br />
      <br />
      <div className='row'>
        <div className='card-lesson col-md-6 offset-md-4 offset-md-3'>
          {pageTitle()}
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'> Название урока:</label>
                <input
                  type='text'
                  placeholder='Ввести название'
                  name='title'
                  value={title}
                  className={errors.title ? 'is-invalid form-control' : 'form-control'}
                  onChange={handleTitle}
                />
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
                />
                {errors.dateOfCreation && <div className='invalid-feedback'> {errors.dateOfCreation}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'> Длительность урока:</label>
                <input
                  type='text'
                  placeholder='Ввести длительность урока'
                  name='duration'
                  value={duration}
                  className={errors.duration ? 'is-invalid form-control' : 'form-control'}
                  onChange={handleDuration}
                />
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
                  {difficultyLevels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.level}
                    </option>
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
                  {lessonCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-group mb-2'>
  <label className='form-label'>Контент:</label>
  <textarea
    placeholder='Введите контент урока'
    name='content'
    value={content}
    className={errors.content ? 'is-invalid form-control' : 'form-control'}
    onChange={handleContent}
    style={{ height: '200px' }} // Задает точную высоту в пикселях
  />
  {errors.content && <div className='invalid-feedback'>{errors.content}</div>}
</div>
<div className='d-grid gap-2 col-6 mx-auto'>
  <button className='btn btn-secondary border-radius-sm' onClick={saveOrUpdateLesson}>
    Отправить
  </button>
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
Листинг А.4 ‒LessonDetaiComponent.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import parser, { Tag } from 'bbcode-to-react';

const LessonDetailComponent = () => {
    const { id } = useParams();
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/lessons/${id}`)
        .then(response => {
            setLesson(response.data);
        })
        .catch(error => {
            console.error('Error fetching lesson', error);
        });
    }, [id]);

    if (!lesson) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <br />
            <h2 className='text-center'>{lesson.title}</h2>
            <div>{parser.toReact(lesson.content)}</div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    );
}

export default LessonDetailComponent;
Листинг А.5 ‒ListWordsComponent.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteWord, listWords } from '../../services/WordService';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListWordsComponent = ({ userRole }) => {
    const [words, setWords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const wordsPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        fetchWords();
    }, [])

    const fetchWords = () => {
        listWords().then((response) => {
            setWords(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    const addNewWord = () => {
        navigate('/add-word');
    }

    const updateWord = (id) => {
        navigate(`/update-word/${id}`);
    }
    const removeWord = (id) => {
        console.log(id);
        deleteWord(id).then((response) => {
            fetchWords();
            toast.promise(
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                }),
                {
                    pending: "Удаление...",
                    success: "Слово удалено"
                },
                {
                    autoClose: 2000
                }
            )

        }).catch(error => {
            console.error(error);
            toast.promise(
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                }),
                {
                    pending: "Удаление...",
                    error: "Слово не удалось удалить"
                },
                {
                    autoClose: 2000
                }
            )
        })
    }

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(words.length / wordsPerPage)));
    }

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }

    const indexOfLastWord = currentPage * wordsPerPage;
    const indexOfFirstWord = indexOfLastWord - wordsPerPage;
    const currentWords = words.slice(indexOfFirstWord, indexOfLastWord);return (
        <div className='container'>
            <h2 className='text-center text-muted'>Словарь</h2>
            {userRole === 'ROLE_ADMIN' && (
                <button className='btn btn-secondary mb-2' onClick={addNewWord}
                style={{marginLeft: '5px'}}
                > Добавить слово</button>
            )}
            <div className='row'>
                {currentWords.map(word => (
                    <div key={word.id} className='col-md-4 mb-4'>
                        <div className='card'>
                            <div className='card-body'>
                                <p className='card-text'>Слово: {word.wordInRussian}</p>
                                <p className='card-text'>Транскрипция: {word.transcription}</p>
                                <p className='card-text'>Хирагана: {word.hiragana}</p>
                                <p className='card-text'>Катакана: {word.katakana}</p>
                                <p className='card-text'>Канзи: {word.kanji}</p>
                                <p className='card-text'>Пример: {word.example}</p>
                                <p className='card-text'>Перевод: {word.translation}</p>
                                {userRole === 'ROLE_ADMIN' && (
                                    <div className="d-grid gap-2">
                                        <button className='btn btn-secondary btn-sm' onClick={( ) => updateWord(word.id)}>Изменить слово</button>
                                        <button className='btn btn-secondary btn-sm' onClick={( ) => removeWord(word.id)}>Удалить слово </button>
                                    </div>
                                    
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='button'>
                <button className='pagination-buttons' onClick={prevPage} disabled={currentPage === 1}>Предыдущий</button>
                <button className='pagination-buttons' onClick={nextPage} disabled={currentPage === Math.ceil(words.length / wordsPerPage)}>Следующий</button>
            </div>
            <ToastContainer 
            transition={Zoom}
            />
            <br/><br/>
        </div>
    );
};

export default ListWordsComponent;
Листинг А.6 ‒WordsComponent.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createWord, getWord, updateWord } from '../../services/WordService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WordsComponent = () => {
    const [wordInRussian, setWordInRussian] = useState('');
    const [transcription, setTranscription] = useState('');
    const [hiragana, setHiragana] = useState('');
    const [katakana, setKatakana] = useState('');
    const [kanji, setKanji] = useState('');
    const [example, setExample] = useState('');
    const [translation, setTranslation] = useState('');

    const {id} = useParams();

    const [errors, setErrors] = useState({
        wordInRussian: '',
        transcription: '',
        hiragana: '',  
        katakana: '',
        kanji: ''
    })

    const navigator = useNavigate();
    useEffect(() =>{
        if(id){
            getWord(id).then((response) => {
                setWordInRussian(response.data.wordInRussian);
                setTranscription(response.data.transcription);
                setHiragana(response.data.hiragana);
                setKatakana(response.data.katakana);
                setKanji(response.data.kanji);
                setExample(response.data.example);
                setTranslation(response.data.translation);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])
  
    function saveOrUpdateWord(e){
        e.preventDefault();

        if(validateForm()){

            const word = {wordInRussian, transcription, hiragana, katakana, kanji, example, translation}
            console.log(word)

            if(id){
                updateWord(id, word).then((response) => {
                    console.log(response.data);
                    navigator('/words')
                }).catch(error => {
                    console.error(error);
                    toast.error('Не удалось обновить слово', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    });
                })
            }else{
                createWord(word).then((response) => {
                    console.log(response.data);
                    navigator('/words')
                }).catch(error => {
                    console.error(error);
                    toast.error('Не удалось добавить слово', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    });
                })
            }
        }

    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(wordInRussian.trim()){
            errorsCopy.wordInRussian = '';
        } else{
            errorsCopy.wordInRussian = 'Необходимо написать слово';
            valid = false;
        }

        if(transcription.trim()){
            errorsCopy.transcription = '';
        } else{
            errorsCopy.transcription = 'Необходимо написать транскрипцию';
            valid = false;
        }

        if(hiragana.trim() || katakana.trim() || kanji.trim()){
            errorsCopy.hiragana = '';
            errorsCopy.katakana = '';
            errorsCopy.kanji = '';
        } else{
            errorsCopy.hiragana = 'Необходимо написать слово/слова';
            errorsCopy.katakana = 'Необходимо написать слово/слова';
            errorsCopy.kanji = 'Необходимо написать слово/слова';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Изменить слово</h2>
        } else{
            return <h2 className='text-center'>Добавить слово</h2>
        }

    }

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card-add col-md-8 offset-md-4'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Слово</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Word'
                                    value={wordInRussian}
                                    className={errors.wordInRussian ? 'is-invalid form-control' : 'form-control'}
                                    onChange={(e) => setWordInRussian(e.target.value)}
                                ></input>
                                {errors.wordInRussian && <div className='invalid-feedback'> {errors.wordInRussian}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Транскрипция</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Transcription'
                                    value={transcription}
                                    className={errors.transcription ? 'is-invalid form-control' : 'form-control'}
                                    onChange={(e) => setTranscription(e.target.value)}
                                ></input>
                                {errors.transcription && <div className='invalid-feedback'> {errors.transcription}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Хирагана</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Hiragana'
                                    value={hiragana}
                                    className={errors.hiragana ? 'is-invalid form-control' : 'form-control'}
                                    onChange={(e) => setHiragana(e.target.value)}
                                    ></input>
                                    {errors.hiragana && <div className='invalid-feedback'> {errors.hiragana}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Катакана</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Katakana'
                                    value={katakana}
                                    className={errors.katakana ? 'is-invalid form-control' : 'form-control'}
                                    onChange={(e) => setKatakana(e.target.value)}
                                ></input>
                                {errors.katakana && <div className='invalid-feedback'> {errors.katakana}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Канзи</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Kanji'
                                    value={kanji}
                                    className={errors.kanji ? 'is-invalid form-control' : 'form-control'}
                                    onChange={(e) => setKanji(e.target.value)}
                                ></input>
                                {errors.kanji && <div className='invalid-feedback'> {errors.kanji}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Пример</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Example'
                                    value={example}
                                    className='form-control'
                                    onChange={(e) => setExample(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Перевод</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Translation'
                                    value={translation}
                                    className='form-control'
                                    onChange={(e) => setTranslation(e.target.value)}
                                />
                            </div>
                            <br />
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button className='btn btn-secondary border-radius-sm' onClick={saveOrUpdateWord}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <br /><br />
        </div>
);
}

export default WordsComponent;

