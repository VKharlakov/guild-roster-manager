import "./Intro.css";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <section className="intro">
      <p className="intro__brief">
        Web application designed to make raiding easier
      </p>
      <div className="intro__button-container">
        <Link className="intro__link" to={"/guilds"}>
          Browse guilds
        </Link>
      </div>
    </section>
  );
}

export default Intro;
