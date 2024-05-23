import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import{ listLessons } from '../../services/LessonService';

const ListLessonsComponent = ({ userRole }) => {
    const [lessons, setLessons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const lessonsPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = () => {
        listLessons().then((response) => {
            setLessons(response.data);
        }).catch(error => {
            console.error(error);
        });
    };

    const startLesson = () => {
        navigate('/lesson-content');
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(lessons.length / lessonsPerPage)));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const indexOfLastLesson = currentPage * lessonsPerPage;
    const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
    const currentLessons = lessons.slice(indexOfFirstLesson, indexOfLastLesson);

    return (
        <div className='container'>
            <h2 className='text-center text-muted'>Уроки</h2>
            {/* {userRole === 'ROLE_ADMIN' && (
                <button className='btn btn-secondary mb-2' onClick={addNewLesson}>Add Lesson</button>
            )} */}
            <div className='row'>
                {currentLessons.map(lesson => (
                    // <div key={lesson.id} className='col-md-4 mb-4'>
                    //     <div className='card'>
                    //         <div className='card-body'>
                    //             <p className='card-text'>Название: {lesson.title}</p>
                    //             {/* {lesson.lessonCategory && (
                    //                 <div className='card-text'>
                    //                     <p>Категория урока: {lesson.lessonCategory.title}</p>
                    //                 </div>
                    //             )}

                    //             {lesson.difficultlyLevel && (
                    //                 <div className='card-text'>
                    //                     <p>Уровень сложности: {lesson.difficultlyLevel.level}</p>
                    //                 </div>
                    //             )} */}
                    //             <p className='card-text'>Дата создания: {lesson.dateOfCreation}</p>
                    //             <p className='card-text'>Длительность изучения: {lesson.duration}</p>
                    //             <button className='btn btn-secondary mb-3' onClick={startLesson}>Начать изучение</button>
                    //         </div>
                    //     </div>
                    // </div>
                    <div key={lesson.id} className='col-md-4 mb-4'>
                            <p>{lesson.title}</p>

                    </div>
                ))}
            </div>

            <div className='button'>
                <button className='pagination-buttons' onClick={prevPage} disabled={currentPage === 1}>Предыдущий</button>
                <button className='pagination-buttons' onClick={nextPage} disabled={currentPage === Math.ceil(lessons.length / lessonsPerPage)}>Следующий</button>
            </div>
            <br/><br/>
        </div>
    );
};

export default ListLessonsComponent;