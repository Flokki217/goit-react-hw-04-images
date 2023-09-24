import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';
const ImageGallery = ({ images, onImageClick }) => {
  return (
    <div>
      <ul className={css.gallery}>
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            imageUrl={webformatURL}
            alt={`Image ${id}`}
            onImageClick={() => onImageClick(largeImageURL)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
