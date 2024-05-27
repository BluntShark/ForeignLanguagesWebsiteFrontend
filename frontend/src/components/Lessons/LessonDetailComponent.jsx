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