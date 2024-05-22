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

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import HomePage from './components/HomePage';
import ListWordsComponent from './components/Words/ListWordsComponent';
import WordsComponent from './components/Words/WordsComponent';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Auth/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const role = localStorage.getItem('userRole');
    setIsAuthenticated(auth === 'true');
    setUserRole(role);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/words' element={<PrivateRoute element={<ListWordsComponent userRole={userRole} />} isAuthenticated={isAuthenticated} />} />
          <Route path='/add-word' element={<PrivateRoute element={<WordsComponent />} isAuthenticated={isAuthenticated} />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
