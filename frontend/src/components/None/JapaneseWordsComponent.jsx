// import React, { useState } from 'react'
// import { createJapaneseWord } from './services/JapaneseWordService'
// import { useNavigate } from 'react-router-dom'

// const JapaneseWordsComponent = () => {

//   const [hiragana, setHiragana] = useState('')
//   const [katakana, setKatakana] = useState('')
//   const [kanji, setKanji] = useState('')
//   const [example, setExample] = useState('')
//   const [translation, setTranslation] = useState('')

//   const navigator = useNavigate();
  
//   function saveJapaneseWord(e){
//     e.preventDefault();
//     const japaneseWord = {hiragana, katakana, kanji, example, translation}
//     console.log(japaneseWord)

//     createJapaneseWord(japaneseWord).then((response) => {
//       console.log(response.data);
//       navigator('/japaneseWords')
//     })
//   }

//   return (
//     <div className='container'>
//       <br /><br />
//       <div className='row'>
//         <div className='card col-md-6 offset-md-3 offset md-3'>
//           <h2 className='text-center'>Add japanese word</h2>
//           <div className='card-body'>
//             <form>
//               <div className='form-group mb-2'>
//                 <label className='form-label'>Hiragana</label>
//                 <input 
//                   type='text'
//                   placeholder='Enter Hiragana'
//                   name='hiragana'
//                   value={hiragana}
//                   className='form-control'
//                   onChange={(e) => setHiragana(e.target.value)}
//                   >
//                 </input>
//               </div>

//               <div className='form-group mb-2'>
//                 <label className='form-label'>Katakana</label>
//                 <input 
//                   type='text'
//                   placeholder='Enter Katakana'
//                   name='katakana'
//                   value={katakana}
//                   className='form-control'
//                   onChange={(e) => setKatakana(e.target.value)}
//                   >
//                 </input>
//               </div>

//               <div className='form-group mb-2'>
//                 <label className='form-label'>Kanji</label>
//                 <input 
//                   type='text'
//                   placeholder='Enter Kanji'
//                   name='kanji'
//                   value={kanji}
//                   className='form-control'
//                   onChange={(e) => setKanji(e.target.value)}
//                   >
//                 </input>
//               </div>

//               <div className='form-group mb-2'>
//                 <label className='form-label'>Example</label>
//                 <input 
//                   type='text'
//                   placeholder='Enter Example'
//                   name='example'
//                   value={example}
//                   className='form-control'
//                   onChange={(e) => setExample(e.target.value)}
//                   >
//                 </input>
//               </div>

//               <div className='form-group mb-2'>
//                 <label className='form-label'>Translation</label>
//                 <input 
//                   type='text'
//                   placeholder='Enter Translation'
//                   name='translation'
//                   value={translation}
//                   className='form-control'
//                   onChange={(e) => setTranslation(e.target.value)}
//                   >
//                 </input>
//               </div>

//               <button className='btn btn-dark' onClick={saveJapaneseWord}>Submit</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default JapaneseWordsComponent