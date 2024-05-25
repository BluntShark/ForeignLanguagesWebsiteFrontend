import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import parser from 'bbcode-to-react';

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
            <h2>Уроки</h2>
            <h2>{lesson.title}</h2>
            <p>{lesson.content}</p>
        </div>
    );
}

export default LessonDetailComponent;