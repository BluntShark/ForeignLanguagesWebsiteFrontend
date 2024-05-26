import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import { listTests } from '../../services/TestService';

const ListTestsComponent = ({ userRole }) => {
    const [tests, setTests] = useState([]);

    useEffect(() =>{
        listTests().then((response) => {
            setTests(response.data);
        }).catch(error => {
            console.error(error);
        });
    })
    const navigate = useNavigate();

    const addNewtest = () => {
        navigate('/add-test');
    }
  return (
    <div className='container'>
        <h2 className='text-center'>Список тестов</h2>
        {userRole === 'ROLE_ADMIN' && (
                <button className='btn btn-secondary mb-2' onClick={addNewtest}> Создать урок</button>
            )}
        <table className='table table-bordered table-success table-striped table table-hover'>
            <thead className='table-dark'>
                <tr>
                    <th>Название</th>
                    <th>Уровень языка</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {
                    tests.map(test =>
                        <tr key={test.id}>
                            <td>{test.name}</td>
                            {test.languageLevel && (
                                <td>{test.languageLevel.title}</td>
                            )}
                            {userRole === 'ROLE_ADMIN' && 
                            <td style={{textAlign: 'center'}}> 
                                <button className='btn btn-secondary btn-sm' onClick={() => updateLesson(lesson.id)}> Изменить урок</button>
                                <button className='btn btn-dark btn-sm' onClick={() => removeLesson(lesson.id)}
                                    style={{marginLeft: '10px'}}
                                > Удалить урок</button>
                            </td>}
                            {userRole === 'ROLE_USER' && 
                            <td style={{textAlign: 'center'}}> 
                                <button className='btn btn-dark btn-sm' onClick={() => removeLesson(lesson.id)}
                                    style={{marginLeft: '10px'}}
                                > Пройти урок</button>
                            </td>}
                            
                        </tr>
                    )
                }
            </tbody>
        </table>
        <ToastContainer
            transition={Zoom}
            />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}

export default ListTestsComponent