import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import React, { useEffect, useState } from 'react';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import LoadMore from './Button/Button';
import axios from 'axios';
import Notiflix from 'notiflix';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38612538-8ea737d14f77121ff1f861688';
export const fetchImages = async (searchQuery, page) => {
  const params = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: page,
  };
  try {
    const response = await axios({ params });
    const { hits, totalHits } = response.data;
    if (hits.length === 0) {
      throw new Error(Notiflix.Notify.failure('Sorry, i not found anything'));
    }
    return { hits, totalHits };
  } catch (error) {}
};

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isImagesShown, setIsImagesShown] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = query => {
    if (query !== searchQuery) {
      setSearchQuery(query);
      setPage(1);
      setImages([]);
      setIsImagesShown(false);
      setIsLoading(true);
    }
  };

  const handleCloseModal = () => {
    setLargeImageURL('');
    setShowModal(false);
  };
  const handleImageClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const fetchImagesAndUpdateState = async () => {
      try {
        const { hits, totalHits } = await fetchImages(searchQuery, page);
        setIsLoading(true);
        setImages(prevImages => [...prevImages, ...hits]);
        setIsImagesShown(true);
        setTotalHits(totalHits);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchImagesAndUpdateState();
  }, [page, searchQuery]);

  const handleLoadMoreClick = () => setPage(prevPage => prevPage + 1);

  const shouldShowButton = images.length < totalHits;

  return (
    <div className="app">
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      <ImageGallery
        images={images}
        searchQuery={searchQuery}
        page={page}
        onImageClick={handleImageClick}
      />
      {isImagesShown && shouldShowButton && (
        <LoadMore onLoadMore={handleLoadMoreClick} />
      )}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={handleCloseModal} />
      )}
    </div>
  );
};
