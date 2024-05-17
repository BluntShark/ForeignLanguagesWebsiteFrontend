import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListJapaneseWordsComponent from './components/ListJapaneseWordsComponent'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import JapaneseWords from './components/JapaneseWords'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* //http://localhost:8080 */}
          <Route path='/' element = { <ListJapaneseWordsComponent /> }></Route>
          {/* //http://localhost:8080/japaneseWords */}
          <Route path='/japaneseWords' element = { <ListJapaneseWordsComponent /> }></Route>
          <Route path='/add-japaneseWord' element = { <JapaneseWords /> }></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
