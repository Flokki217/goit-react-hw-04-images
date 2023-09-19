import css from './ButtonStyle.module.css';
const LoadMore = ({ onLoadMore }) => {
  return (
    <button type="button" className={css.button} onClick={onLoadMore}>
      Load more
    </button>
  );
};
export default LoadMore;
