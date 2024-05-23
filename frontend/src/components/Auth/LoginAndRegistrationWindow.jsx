import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast as registerSuccess, toast as registerNotSuccess, toast as loginSuccess, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginAndRegistrationWindow = ({ setIsAuthenticated, setUserRole }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:8080/auth/login' : 'http://localhost:8080/auth/register';
    const userInfo = { username, password };

    try {
      const response = await axios.post(url, userInfo);
      if (isLogin) {
        loginSuccess.success('Успешный вход', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('username', username);
        setIsAuthenticated(true);
        setUserRole(response.data.role);
        navigate('/');
      } else {
        registerSuccess.success('Регистрацияя прошла успешно, войдите в созданный аккаунт', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
        setIsLogin(true);
      }
    } catch (error) {
      if(isLogin){
        registerNotSuccess.error('Ошибка входа, проверьте свои реквизиты', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
      }else{
        registerNotSuccess.error('Ошибка регистрации, пользоватеьль с таким именем уже существует', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Войти' : 'Зарегистрироваться'}</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
      <button type="button" onClick={handleToggle}>
        {isLogin ? 'Зарегистрироваться' : 'Войти'}
      </button>
      <ToastContainer 
      transition={Zoom}
      />
    </form>
  );
};

export default LoginAndRegistrationWindow;