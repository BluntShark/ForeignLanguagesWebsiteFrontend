import React from 'react';
import "./Modal.css";

const Modal = ({ active, setActive }) => {
  return (
    <div className={`modal ${active ? 'active' : ''}`} onClick={() => setActive(false)}>
      <div className='modal__content' onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2>Модальное окно</h2>
        </div>
        <div className="modal__body">
          <p>Содержимое модального окна</p>
        </div>
        <div className="modal__footer">
          <button onClick={() => setActive(false)}>Подтвердить</button>
          <button onClick={() => setActive(false)}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;