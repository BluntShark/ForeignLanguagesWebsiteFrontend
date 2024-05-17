import React, {useEffect, useState} from 'react'
import { listJapaneseWords } from '../services/JapaneseWordService'
import { useNavigate } from 'react-router-dom'

const ListJapaneseWordsComponent = () => {
    
    const [japaneseWords, setJapaneseWords] = useState([])
    const navigator = useNavigate();

    useEffect(() => {
        listJapaneseWords().then((response) => {
            setJapaneseWords(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    function addNewJapaneseWord(){
        navigator('/add-japaneseWord')
    }
  return (
    <div className='container'>
        <h2 className='text-center'>List of japanese words</h2>
        <button className='btn btn-secondary mb-2' onClick={addNewJapaneseWord}>Add word</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>hiragana</th>
                    <th>katakana</th>
                    <th>kanji</th>
                    <th>example</th>
                    <th>translation</th>
                </tr>
            </thead>
            <tbody>
                {
                    japaneseWords.map(japaneseWords => 
                        <tr key={japaneseWords.id}>
                            <td>{japaneseWords.hiragana}</td>
                            <td>{japaneseWords.katakana}</td>
                            <td>{japaneseWords.kanji}</td>
                            <td>{japaneseWords.example}</td>
                            <td>{japaneseWords.translation}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListJapaneseWordsComponent