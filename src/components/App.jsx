import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    showModal: false,
    largeImageURL: '',
    isImagesShown: false,
    totalHits: 0,
    isLoading: false,
  };

  handleFormSubmit = searchQuery => {
    if (searchQuery !== this.state.searchQuery) {
      this.setState({
        searchQuery,
        page: 1,
        images: [],
        isImagesShown: false,
        isLoading: true,
      });
    }
  };

  handleCloseModal = () => {
    this.setState({
      largeImageURL: '',
      showModal: false,
    });
  };
  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL, showModal: true });
  };
  fetchImagesAndUpdateState = async (searchQuery, page) => {
    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);
      this.setState({ isLoading: true });
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        page: prevState.page + 1,
        isImagesShown: true,
        searchQuery,
        totalHits,
      }));
    } catch (error) {
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMoreClick = () => {
    const { searchQuery, page } = this.state;

    this.fetchImagesAndUpdateState(searchQuery, page);
  };

  render() {
    const {
      searchQuery,
      page,
      images,
      showModal,
      largeImageURL,
      isImagesShown,
      totalHits,
      isLoading,
    } = this.state;
    const shouldShowButton = images.length < totalHits;

    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && <Loader />}
        <ImageGallery
          images={images}
          searchQuery={searchQuery}
          page={page}
          onImageClick={this.handleImageClick}
          renderImages={this.fetchImagesAndUpdateState}
        />
        {isImagesShown && shouldShowButton && (
          <LoadMore onLoadMore={this.handleLoadMoreClick} />
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
