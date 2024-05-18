// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from "axios";

// const WordsComponent = () => {

//     const [wordInRussian, setWordInRussian] = useState('');
//     const [transcription, setTranscription] = useState('');


//     const navigate = useNavigate();

//     const saveWord = (e) => {
//         e.preventDefault();
//         const word = { wordInRussian, transcription};
//         console.log(word);

//         createWord(word).then((response) => {
//             console.log(response.data);
//             navigate('/words');
//         }).catch(error => {
//             console.error(error);
//         });
//     };

//     return (
//         <div className='container'>
//             <br /><br />
//             <div className='row'>
//                 <div className='card col-md-6 offset-md-3'>
//                     <h2 className='text-center'>Add Word</h2>
//                     <div className='card-body'>
//                         <form>
//                             <div className='form-group mb-2'>
//                                 <label className='form-label'>Word in Russian</label>
//                                 <input 
//                                     type='text'
//                                     placeholder='Enter Word in Russian'
//                                     name='wordInRussian'
//                                     value={wordInRussian}
//                                     className='form-control'
//                                     onChange={(e) => setWordInRussian(e.target.value)}
//                                 />
//                             </div>

//                             <div className='form-group mb-2'>
//                                 <label className='form-label'>Transcription</label>
//                                 <input 
//                                     type='text'
//                                     placeholder='Enter Transcription'
//                                     name='transcription'
//                                     value={transcription}
//                                     className='form-control'
//                                     onChange={(e) => setTranscription(e.target.value)}
//                                 />
//                             </div>

//                             <button className='btn btn-dark' onClick={saveWord}>Submit</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default WordsComponent


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWord } from '../services/WordService';
import axios from 'axios';

const WordsComponent = () => {
    const [wordInRussian, setWordInRussian] = useState('');
    const [transcription, setTranscription] = useState('');
    const [selectedJapaneseWord, setSelectedJapaneseWord] = useState('');
    const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState('');
    const [japaneseWords, setJapaneseWords] = useState([]);
    const [partsOfSpeech, setPartsOfSpeech] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/japaneseWords')
            .then(response => setJapaneseWords(response.data))
            .catch(error => console.error('Error fetching Japanese words:', error));

        axios.get('http://localhost:8080/partOfSpeeches')
            .then(response => setPartsOfSpeech(response.data))
            .catch(error => console.error('Error fetching parts of speech:', error));
    }, []);

    const saveWord = (e) => {
        e.preventDefault();


        const word = {
            wordInRussian,
            transcription,
            selectedJapaneseWord,
            selectedPartOfSpeech
        };

        console.log("Word object being sent:", word);

        createWord(word)
            .then(response => {
                console.log(response.data);
                navigate('/words');
            })
            .catch(error => {
                console.error('Error saving word:', error);
            });
    };

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center'>Add Word</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Word in Russian</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Word in Russian'
                                    value={wordInRussian}
                                    className='form-control'
                                    onChange={(e) => setWordInRussian(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Transcription</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Transcription'
                                    value={transcription}
                                    className='form-control'
                                    onChange={(e) => setTranscription(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Japanese Word</label>
                                <select
                                    value={selectedJapaneseWord}
                                    className='form-control'
                                    onChange={(e) => setSelectedJapaneseWord(e.target.value)}>
                                    <option value=''>Select Japanese Word</option>
                                    {japaneseWords.map(word => (
                                        <option key={word.id} value={word.id}>{word.hiragana} / {word.katakana} / {word.kanji} ({word.translation})</option>
                                    ))}
                                </select>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Part of Speech</label>
                                <select
                                    value={selectedPartOfSpeech}
                                    className='form-control'
                                    onChange={(e) => setSelectedPartOfSpeech(e.target.value)}
                                >
                                    <option value=''>Select Part of Speech</option>
                                    {partsOfSpeech.map(pos => (
                                        <option key={pos.id} value={pos.id}>{pos.partOfSpeech}</option>
                                    ))}
                                </select>
                            </div>

                            <button className='btn btn-dark' onClick={saveWord}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WordsComponent;