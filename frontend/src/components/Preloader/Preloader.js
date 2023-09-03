import "./Preloader.css";

function Preloader({ isActive }) {
  return (
    <div className={`preloader${!isActive ? " preloader_hidden" : ""}`}>
      <div className="preloader__container">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Preloader;
