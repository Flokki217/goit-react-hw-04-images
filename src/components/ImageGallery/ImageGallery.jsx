import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';
import css from './ImageGallery.module.css';
class ImageGallery extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page, renderImages } = this.props;
    if (prevProps.searchQuery !== searchQuery) {
      renderImages(searchQuery, page);
    }
  }

  render() {
    const { images, onImageClick } = this.props;

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
  }
}

export default ImageGallery;
