import React from "react";
import { Link } from "react-router-dom";

export default function Explore() {
  return (
    <section id="explore">
        <div className="container">
            <div className="row row__column">
                <h2>Explore Music</h2>
                <h3>Discover new tracks, albums, and artists tailored to your taste. Dive into curated playlists and explore trending music from around the world.</h3>
                <Link to="/musicplayer" className="btn btn__primary">Click Music Player</Link>
            </div>
        </div>
    </section>
  )
};
