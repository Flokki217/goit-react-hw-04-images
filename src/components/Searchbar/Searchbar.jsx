import React, { useState } from 'react';
import Notiflix from 'notiflix';
import css from './SearchbarStyle.module.css';
const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleInputChange = e => setSearchQuery(e.currentTarget.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      Notiflix.Notify.failure('Field is empty');
      return;
    }
    onSubmit(searchQuery);
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit}>
        <input
          className={css.searchForm}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={searchQuery}
        />{' '}
        <button type="submit" className={css.button}>
          <span className="searchForm-button-label">Search</span>
        </button>
      </form>
    </header>
  );
};

export default Searchbar;
