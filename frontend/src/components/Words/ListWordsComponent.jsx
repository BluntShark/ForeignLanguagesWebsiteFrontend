import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listWords } from '../../services/WordService';

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

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(words.length / wordsPerPage)));
    }

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }

    const indexOfLastWord = currentPage * wordsPerPage;
    const indexOfFirstWord = indexOfLastWord - wordsPerPage;
    const currentWords = words.slice(indexOfFirstWord, indexOfLastWord);

    return (
        <div className='container'>
            <h2 className='text-center text-muted'>Словарь</h2>
            {userRole === 'ROLE_ADMIN' && (
                <button className='btn btn-secondary mb-2' onClick={addNewWord}>Добавить слово</button>
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
            <br/><br/>
        </div>
    );
};

export default ListWordsComponent;