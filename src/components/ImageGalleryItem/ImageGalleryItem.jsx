import React from 'react';
import css from './ImageGallery.module.css';
const ImageGalleryItem = ({ imageUrl, alt, onImageClick }) => {
  return (
    <li onClick={onImageClick} className={css.item}>
      <img src={imageUrl} alt={alt} className={css.image} />
    </li>
  );
};

export default ImageGalleryItem;
