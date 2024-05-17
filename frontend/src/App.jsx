import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListJapaneseWordsComponent from './components/ListJapaneseWordsComponent'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import JapaneseWords from './components/JapaneseWordsComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* //http://localhost:3000 */}
          <Route path='/' element = { <ListJapaneseWordsComponent /> }></Route>
          {/* //http://localhost:3000/japaneseWords */}
          <Route path='/japaneseWords' element = { <ListJapaneseWordsComponent /> }></Route>
          {/* //http://localhost:3000/add-japaneseWords */}
          <Route path='/add-japaneseWord' element = { <JapaneseWords /> }></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
