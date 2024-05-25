import React, { useEffect, useState } from 'react'
import { listLessons } from '../../services/LessonService'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ListLessonsComponent = ({ userRole }) => {

    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        listLessons().then((response) => {
            setLessons(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

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
                    {/* <th>Котент</th> */}
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
                            {/* <td>{lesson.content}</td> */}
                            <td>
                            {userRole === 'ROLE_ADMIN' && (
                                <button className='btn btn-secondary btn-sm' onClick={() => updateLesson(lesson.id)}> Изменить урок</button> )}
                            </td>
                        </tr> 
                    )
                }
            </tbody>
        </table>
        <ToastContainer 
            transition={Zoom}
            />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}

export default ListLessonsComponent