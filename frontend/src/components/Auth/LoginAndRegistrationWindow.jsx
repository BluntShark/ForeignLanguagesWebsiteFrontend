import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        alert(response.data.message);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', response.data.role);
        setIsAuthenticated(true);
        setUserRole(response.data.role);
        navigate('/');
      } else {
        alert('Регистрацияя прошла успешно, войдите в созданный аккаунт');
        setIsLogin(true);
      }
    } catch (error) {
      alert(isLogin ? 'Ошибка входа, проверьте свои реквизиты' : 'Ошибка входа, данное имя пользователя уже существует');
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
    </form>
  );
};

export default LoginAndRegistrationWindow;