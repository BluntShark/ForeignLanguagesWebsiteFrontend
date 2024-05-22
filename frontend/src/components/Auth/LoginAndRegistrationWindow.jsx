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
        alert('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (error) {
      alert(isLogin ? 'Login failed. Please check your credentials.' : 'Registration failed. Username might be taken.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      <button type="button" onClick={handleToggle}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </form>
  );
};

export default LoginAndRegistrationWindow;