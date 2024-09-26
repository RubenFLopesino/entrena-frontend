import "./loader.scss";

const Loader = (): JSX.Element => {
  return (
    <div className="loader" data-testid="loader">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
