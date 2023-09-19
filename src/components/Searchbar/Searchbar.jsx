import React, { Component } from 'react';
import Notiflix from 'notiflix';
import css from './SearchbarStyle.module.css';
class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = e => {
    this.setState({ searchQuery: e.currentTarget.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (searchQuery.trim() === '') {
      Notiflix.Notify.failure('Nothing to search!!!');
      return;
    }
    this.props.onSubmit(searchQuery);
  };
  render() {
    const { searchQuery } = this.state;
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit}>
          <input
            className={css.searchForm}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={searchQuery}
          />{' '}
          <button type="submit" className={css.button}>
            <span className="searchForm-button-label">Search</span>
          </button>
        </form>
      </header>
    );
  }
}
export default Searchbar;
