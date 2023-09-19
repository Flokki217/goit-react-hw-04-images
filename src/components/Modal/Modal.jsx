import React, { Component } from 'react';
import css from './ModalStyle.module.css';
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscClick);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscClick);
  }

  handleEscClick = e => {
    const { onClose } = this.props;
    if (e.code === 'Escape') {
      onClose();
    }
  };

  render() {
    const { largeImageURL, onClose } = this.props;

    return (
      <div className={css.overlay} onClick={onClose}>
        <div className={css.modal}>
          <img src={largeImageURL} className={css.img} alt="Large" />
        </div>
      </div>
    );
  }
}

export default Modal;
