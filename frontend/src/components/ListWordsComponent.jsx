import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listWords } from '../services/WordService';
import { listJapaneseWords } from '../services/JapaneseWordService';

const ListWordsComponent = () => {
    const [words, setWords] = useState([])
    const [japaneseWords, setJapaneseWords] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const wordsPerPage = 6;
    const navigator = useNavigate();

    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = () => {
        listWords().then((response) => {
            setWords(response.data);
        }).catch(error => {
            console.error(error);
        });
    };
    useEffect(() => {
        fetchJapaneseWords();
    }, []);

    const fetchJapaneseWords = () => {
        listJapaneseWords().then((response) => {
            setJapaneseWords(response.data);
        }).catch(error => {
            console.error(error);
        });
    };

    const addNewWord = () => {
        navigator('/add-word');
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(words.length / wordsPerPage)));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const indexOfLastWord = currentPage * wordsPerPage;
    const indexOfFirstWord = indexOfLastWord - wordsPerPage;
    const currentWords = words.slice(indexOfFirstWord, indexOfLastWord);

    return (
        <div className='container'>
            <h2 className='text-center'>List of Words</h2>
            <button className='btn btn-secondary mb-2' onClick={addNewWord}>Add Word</button>
            <div className='row'>
                {currentWords.map(word => (
                    <div key={word.id} className='col-md-4 mb-4'>
                        <div className='card'>
                            <div className='card-body'>
                                <p className='card-text'>Word in Russian: {word.wordInRussian}</p>
                                <p className='card-text'>Transcription: {word.transcription}</p>
                                {word.japaneseWord && (
                                    <div className='card-text'>
                                        <p>Kanji: {word.japaneseWord.kanji}</p>
                                        <p>Hiragana: {word.japaneseWord.hiragana}</p>
                                        <p>Katakana: {word.japaneseWord.katakana}</p>
                                        <p>Example: {word.japaneseWord.example}</p>
                                        <p>Translation: {word.japaneseWord.translation}</p>
                                    </div>
                                )}
                                {word.partOfSpeech && (
                                    <div className='card-text'>
                                        <p>Part of Speech: {word.partOfSpeech.partOfSpeech}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='button '>
                <button className='pagination-buttons' onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <button className='pagination-buttons' onClick={nextPage} disabled={currentPage === Math.ceil(words.length / wordsPerPage)}>Next</button>
            </div>
            <br/ ><br/>
        </div>
    );
};

export default ListWordsComponent;