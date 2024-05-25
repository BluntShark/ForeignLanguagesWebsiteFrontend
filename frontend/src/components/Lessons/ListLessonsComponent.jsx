import React, { useEffect, useState } from 'react'
import { listLessons } from '../../services/LessonService'
import axios from 'axios';


const ListLessonsComponent = () => {

    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        listLessons().then((response) => {
            setLessons(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    const viewContent = () => {
        console.log("Ok!");
    }

  return (
    <div className='container'>
        <h2 className='text-center'>Список уроков</h2>
        <table className='table table-bordered table-success table-striped table table-hover'>
            <thead className='table-dark'>
                <tr>
                    <th>Название</th>
                    <th>Дата создания</th>
                    <th>Длительность</th>
                    <th>Уровень сложности</th>
                    <th>Категория урока</th>
                </tr>
            </thead>
            <tbody>
                {
                    lessons.map(lesson =>
                        <tr key={lesson.id} onClick={viewContent}>
                            <td>{lesson.title}</td>
                            <td>{lesson.dateOfCreation}</td>
                            <td>{lesson.duration}</td>
                            {lesson.difficultlyLevel && (
                                <td>{lesson.difficultlyLevel.level}</td>
                            )}
                            {lesson.lessonCategory && (
                                <td>{lesson.lessonCategory.title}</td>
                            )}
                        </tr> 
                    )
                }
            </tbody>
        </table>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}

export default ListLessonsComponent