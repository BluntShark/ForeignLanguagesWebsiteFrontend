import React from 'react'
import "./Modal.css"

const Modal = ({active, setActive}) => {
  return (
    <div className='modal' onClick={() => setActive(false)}>
        <div className='modal__content' onClick={e => e.stopPropagation()}>
            <div className="modal__header">
            </div>
            <div className="modal__footer">
                <button>Подтвердить</button>
                <button>Отмена</button>
            </div>
        </div>
    </div>
  )
}

export default Modal