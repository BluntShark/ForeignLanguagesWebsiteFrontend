import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWord } from '../../services/WordService';

const WordsComponent = () => {
    const [wordInRussian, setWordInRussian] = useState('');
    const [transcription, setTranscription] = useState('');
    const [hiragana, setHiragana] = useState('');
    const [katakana, setKatakana] = useState('');
    const [kanji, setKanji] = useState('');
    const [example, setExample] = useState('');
    const [translation, setTranslation] = useState('');

    const navigator = useNavigate();
  
  function saveWord(e){
    e.preventDefault();
    const word = {wordInRussian, transcription, hiragana, katakana, kanji, example, translation}
    console.log(word)

    createWord(word).then((response) => {
      console.log(response.data);
      navigator('/words')
    })
  }
    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center'>Add Word</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Слово</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Word in Russian'
                                    value={wordInRussian}
                                    className='form-control'
                                    onChange={(e) => setWordInRussian(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Транскрипция</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Transcription'
                                    value={transcription}
                                    className='form-control'
                                    onChange={(e) => setTranscription(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Хирагана</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Word in Russian'
                                    value={hiragana}
                                    className='form-control'
                                    onChange={(e) => setHiragana(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Катакана</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Transcription'
                                    value={katakana}
                                    className='form-control'
                                    onChange={(e) => setKatakana(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Канзи</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Word in Russian'
                                    value={kanji}
                                    className='form-control'
                                    onChange={(e) => setKanji(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Пример</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Transcription'
                                    value={example}
                                    className='form-control'
                                    onChange={(e) => setExample(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Перевод</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Transcription'
                                    value={translation}
                                    className='form-control'
                                    onChange={(e) => setTranslation(e.target.value)}
                                />
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