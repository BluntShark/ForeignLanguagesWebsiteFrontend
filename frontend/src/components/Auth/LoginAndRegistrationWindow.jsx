import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginAndRegistrationWindow.css';

const LoginAndRegistrationWindow = ({ setIsAuthenticated, setUserRole }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:8080/auth/login' : 'http://localhost:8080/auth/register';
    const userInfo = { username, password };

    try {
      if(validateForm()){
        const response = await axios.post(url, userInfo);
      if (isLogin) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('username', username);
        setIsAuthenticated(true);
        setUserRole(response.data.role);
        navigate('/');
      } else {
        toast.success('Регистрация прошла успешно, войдите в созданный аккаунт', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light"
        });
        setIsLogin(true);
      }
    }
      
    } catch (error) {
      if (isLogin) {
        toast.error('Ошибка входа, проверьте свои реквизиты', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      } else {
        toast.error('Ошибка регистрации, пользователь с таким именем уже существует', {
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

  function validateForm(){
    let valid = true;

    const errorsCopy = {... errors}

    if(username.trim()){
      errorsCopy.username = '';
    } else{
      errorsCopy.username = 'Необходимо запонить поле';
      valid = false;
    }

    if(password.trim()){
      errorsCopy.password = '';
    } else{
      errorsCopy.password = 'Необходимо заполнить поле';
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;

  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">{isLogin ? 'Войти' : 'Регистрация'}</h2>
        <div className="form-group">
          <label>Username:</label>
          <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className={errors.username ? 'is-invalid form-control' : 'form-control'}/>
          {errors.username && <div className='invalid-feedback'> {errors.username}</div>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password ? 'is-invalid form-control' : 'form-control'}/>
          {errors.password && <div className='invalid-feedback'> {errors.password}</div>}
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-submit">{isLogin ? 'Войти' : 'Регистрация'}</button>
          <button type="button" className="btn-toggle" onClick={handleToggle}>
            {isLogin ? 'Регистрация' : 'Войти'}
          </button>
        </div>
      </form>
      <ToastContainer transition={Zoom} />
    </div>
  );
};

export default LoginAndRegistrationWindow;