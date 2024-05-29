// import React, { useEffect, useState } from 'react';
// import { listJapaneseWords } from '../services/JapaneseWordService';
// import { useNavigate } from 'react-router-dom';

// const ListJapaneseWordsComponent = () => {
//     const [japaneseWords, setJapaneseWords] = useState([]);

//     const [currentPage, setCurrentPage] = useState(1);
//     const wordsPerPage = 6;
//     const navigator = useNavigate();

//     useEffect(() => {
//         fetchJapaneseWords();
//     }, []);

//     const fetchJapaneseWords = () => {
//         listJapaneseWords().then((response) => {
//             setJapaneseWords(response.data);
//         }).catch(error => {
//             console.error(error);
//         });
//     };

//     const addNewJapaneseWord = () => {
//         navigator('/add-japaneseWord');
//     };

//     const nextPage = () => {
//         setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(japaneseWords.length / wordsPerPage)));
//     };

//     const prevPage = () => {
//         setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//     };

//     const indexOfLastWord = currentPage * wordsPerPage;
//     const indexOfFirstWord = indexOfLastWord - wordsPerPage;
//     const currentWords = japaneseWords.slice(indexOfFirstWord, indexOfLastWord);

//     return (
//         <div className='container'>
//             <h2 className='text-center'>List of Words</h2>
//             <button className='btn btn-secondary mb-2' onClick={addNewJapaneseWord}>Add Word</button>
//             <div className='row'>
//                 {
//                     currentWords.map(word => 
//                         <div key={word.id} className='col-md-4 mb-4'>
//                             <div className='card-front'>
//                                 <div className='card-body'>
//                                     <p className='card-text'>Hiragana: {word.hiragana}</p>
//                                     <p className='card-text'>Katakana: {word.katakana}</p>
//                                     <p className='card-text'>Kanji: {word.kanji}</p>
//                                     <p className='card-text'>Example: {word.example}</p>
//                                     <p className='card-text'>Translation: {word.translation}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 }
//             </div>
//             <div className='button '>
//                 <button className='pagination-buttons' onClick={prevPage} disabled={currentPage === 1}>Previous</button>
//                 <button className='pagination-buttons' onClick={nextPage} disabled={currentPage === Math.ceil(japaneseWords.length / wordsPerPage)}>Next</button>
//             </div>
//             <br/ ><br/>
//         </div>
//     );
// };

// export default ListJapaneseWordsComponent;