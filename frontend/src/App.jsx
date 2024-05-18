import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListJapaneseWordsComponent from './components/ListJapaneseWordsComponent'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import WordsComponent from './components/WordsComponent'
import ListWordsComponent from './components/ListWordsComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* //http://localhost:3000 */}
          <Route path='/' element = { <ListWordsComponent /> }></Route>

          {/* //http://localhost:3000/japaneseWords */}
          {/* <Route path='/japaneseWords' element = { <ListJapaneseWordsComponent /> }></Route> */}

          {/* //http://localhost:3000/words */}
          <Route path='/words' element = { <ListWordsComponent/> }></Route>

          {/* //http://localhost:3000//add-word */}
          <Route path='/add-word' element = { <WordsComponent /> }></Route>
        </Routes>
        {/* <FooterComponent /> */}
      </BrowserRouter>
    </>
  )
}

export default App
