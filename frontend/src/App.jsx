// import './App.css'
// import FooterComponent from './components/FooterComponent'
// import HeaderComponent from './components/HeaderComponent'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import {BrowserRouter, Route, Routes} from 'react-router-dom'
// import WordsComponent from './components/Words/WordsComponent'
// import ListWordsComponent from './components/Words/ListWordsComponent'
// import { HomePage } from './components/HomePage'
// import Login from './components/Auth/Login'
// import Register from './components/Auth/Register'

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <HeaderComponent />
//         <Routes>
//           {/* //http://localhost:3000 */}
//           <Route path='/' element = { <HomePage /> }></Route>

//           {/* //http://localhost:3000/words */}
//           <Route path='/words' element = { <ListWordsComponent/> }></Route>

//           {/* //http://localhost:3000/add-word */}
//           <Route path='/add-word' element = { <WordsComponent /> }></Route>

//           {/* //http://localhost:3000/login */}
//           <Route path='/login' element={<Login />}></Route>

//           {/* //http://localhost:3000/register */}
//           <Route path='/register' element={<Register />}></Route>
//         </Routes>
//         <FooterComponent />
//       </BrowserRouter>
//     </div>
//   )
// }

// export default App

import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import WordsComponent from './components/Words/WordsComponent';
import ListWordsComponent from './components/Words/ListWordsComponent';
import { HomePage } from './components/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { useEffect, useState } from 'react';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(auth === 'true');
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/words' element={<PrivateRoute element={<ListWordsComponent />} isAuthenticated={isAuthenticated} />} />
          <Route path='/add-word' element={<PrivateRoute element={<WordsComponent />} isAuthenticated={isAuthenticated} />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
