import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import HomePage from './components/HomePage';
import ListWordsComponent from './components/Words/ListWordsComponent';
import WordsComponent from './components/Words/WordsComponent';
import LoginAndRegistrationWindow from './components/Auth/LoginAndRegistrationWindow';
import PrivateRoute from './components/Auth/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListLessonsComponent from './components/Lessons/ListLessonsComponent';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LessonComponent from './components/Lessons/LessonComponent';
import LessonDetailComponent from './components/Lessons/LessonDetailComponent';
import ListTestsComponent from './components/Tests/ListTestsComponent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const role = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');
    setIsAuthenticated(auth === 'true');
    setUserRole(role);
    setUsername(username);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route
            path='/'
            element={isAuthenticated ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path='/auth'
            element={<LoginAndRegistrationWindow setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />}
          />
          <Route
            path='/words'
            element={<PrivateRoute element={<ListWordsComponent userRole={userRole} />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/lessons'
            element={<PrivateRoute element={<ListLessonsComponent userRole={userRole} />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/tests'
            element={<PrivateRoute element={<ListTestsComponent userRole={userRole} />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/lessons/:id'
            element={<PrivateRoute element={<LessonDetailComponent userRole={userRole} />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/add-word'
            element={<PrivateRoute element={<WordsComponent />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/add-lesson'
            element={<PrivateRoute element={<LessonComponent />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/update-word/:id'
            element={<PrivateRoute element={<WordsComponent />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/update-lesson/:id'
            element={<PrivateRoute element={<LessonComponent />} isAuthenticated={isAuthenticated} />}
          />
        </Routes>
        <ToastContainer transition={Zoom}/>
      </BrowserRouter>
    </div>
  );
}

export default App;