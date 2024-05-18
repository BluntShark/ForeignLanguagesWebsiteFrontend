import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import WordsComponent from './components/Words/WordsComponent'
import ListWordsComponent from './components/Words/ListWordsComponent'
import { HomePage } from './components/HomePage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* //http://localhost:3000 */}
          <Route path='/' element = { <HomePage /> }></Route>

          {/* //http://localhost:3000/words */}
          <Route path='/words' element = { <ListWordsComponent/> }></Route>

          {/* //http://localhost:3000//add-word */}
          <Route path='/add-word' element = { <WordsComponent /> }></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </div>
  )
}

export default App
