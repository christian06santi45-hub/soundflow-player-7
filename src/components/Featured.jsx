import React, { useEffect, useRef, useState } from "react";
import { getLatestSongs } from "../music";
import { useNavigate } from "react-router-dom";

export default function Featured() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const audioRef = useRef(new Audio());
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getLatestSongs(20);
        if (!ignore) setFeatured(data);
      } catch (e) {
        if (!ignore) setError(e.message || "Failed to load songs");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
      audioRef.current.pause();
      audioRef.current.src = "";
    };
  }, []);

  const togglePreview = (song) => {
    const audio = audioRef.current;

    if (playingId === song.id) {
      audio.pause();
      setPlayingId(null);
      return;
    }

    audio.pause();
    audio.src = song.previewUrl;
    audio.currentTime = 0;
    audio.play();
    setPlayingId(song.id);

    audio.onended = () => setPlayingId(null);
  };

  const handleReview = (song) => {
    navigate("/musicplayer", { state: { selectedSong: song } });
  };

  return (
    <section id="features" className="featured">
      <h1 className="featured__title">New Releases</h1>

      {loading && <p className="featured__status">Loading...</p>}
      {error && (
        <p className="featured__status featured__status--error">{error}</p>
      )}

      <div className="featured__grid">
        {!loading &&
          !error &&
          featured.map((song) => (
            <div className="featured__card" key={song.id}>
              <div
                className={`featured__imgWrap ${
                  playingId === song.id ? "is-playing" : ""
                }`}
                onClick={() => togglePreview(song)}
              >
                <img
                  className="featured__img"
                  src={song.artwork}
                  alt={song.title}
                />
                {song.previewUrl && (
                  <div className="featured__play">
                    {playingId === song.id ? "❚❚" : "▶"}
                  </div>
                )}
              </div>

              <h1 className="featured__name">{song.title}</h1>

              <p className="featured__artist">
                {song.artist} · {new Date(song.releaseDate).getFullYear()}
              </p>

              <button
                className="featured__reviewBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReview(song);
                }}
              >
                Review
              </button>
            </div>
          ))}
      </div>
    </section>
  );
}
