import React, { useEffect } from 'react';
import css from './ModalStyle.module.css';
const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handleEscClick = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscClick);
    return () => {
      window.removeEventListener('keydown', handleEscClick);
    };
  }, [onClose]);

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>
        <img src={largeImageURL} className={css.img} alt="Large" />
      </div>
    </div>
  );
};

export default Modal;
