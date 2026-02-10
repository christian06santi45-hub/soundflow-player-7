import React, { useEffect, useState } from "react";
import headphones from "../assets/headphones.webp";
import istockphoto from "../assets/istockphoto.jpg";
import MusicWars from "../assets/MusicWars.webp";

const images = [headphones, istockphoto, MusicWars];

const Landing = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="landing">
      <header>
        <div className="header__container">
          <div className="header__description">
            <h1>Best Music Experience</h1>
            <h2 className="header__p">
              Listen to your favorite tunes anytime, anywhere
            </h2>
            <a href="#features" className="btn">
              <button className="btn">Browse Music</button>
            </a>
          </div>
          <figure className="header__img--wrapper">
            <img
              className={`hero__img ${fade ? "is-visible" : ""}`}
              src={images[index]}
              alt="Music visuals"
            />
          </figure>
        </div>
      </header>
    </section>
  );
};

export default Landing;
