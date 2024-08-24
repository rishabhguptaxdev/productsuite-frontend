import "../css/loader.css";

const Loader = () => {
    return (
      <div className="loader-container" >
        <div className="spinner-border" style={{height:'7rem', width:'7rem'}} role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
};
  
export default Loader;
  
