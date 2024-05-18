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


    const [errors, setErrors] = useState({
        wordInRussian: '',
        transcription: '',
        hiragana: '',  
        katakana: '',
        kanji: ''
    })

    const navigator = useNavigate();
  
    function saveWord(e){
        e.preventDefault();

        if(validateForm()){
            const word = {wordInRussian, transcription, hiragana, katakana, kanji, example, translation}
            console.log(word)

            createWord(word).then((response) => {
                console.log(response.data);
                navigator('/words')
            })
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

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card-add col-md-8 offset-md-4'>
                    <h2 className='text-center'>Добавить слово</h2>
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
                            <div class="d-grid gap-2 col-6 mx-auto">
                                <button className='btn btn-secondary border-radius-sm' onClick={saveWord}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <br /><br />
        </div>
);
}

export default WordsComponent;