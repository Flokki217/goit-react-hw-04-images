import { MagnifyingGlass } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="loader-container">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="blue"
      />
    </div>
  );
};

export default Loader;
