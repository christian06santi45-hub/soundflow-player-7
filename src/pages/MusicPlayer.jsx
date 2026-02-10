import React, { useEffect, useRef, useState } from "react";
import { getLatestSongs } from "../music";
import { useLocation } from "react-router-dom";

export default function MusicPlayer() {
  const location = useLocation();
  const selectedSong = location.state?.selectedSong || null;
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentSong, setCurrentSong] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  const audioRef = useRef(null);

  useEffect(() => {
    let ignore = false;
    const audio = audioRef.current;

    async function loadSongs() {
      setLoading(true);
      setError("");

      try {
        const data = await getLatestSongs(24);
        if (ignore) return;
        const hasSelectedSong = selectedSong?.id
          ? data.some((song) => song.id === selectedSong.id)
          : false;
        const finalSongs =
          selectedSong && !hasSelectedSong ? [selectedSong, ...data] : data;

        setSongs(finalSongs);
        setCurrentSong(
          (selectedSong && selectedSong.previewUrl && selectedSong) ||
            finalSongs.find((song) => song.previewUrl) ||
            null,
        );
      } catch (e) {
        if (!ignore) setError(e.message || "Failed to load songs");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadSongs();

    return () => {
      ignore = true;
      if (audio) {
        audio.pause();
      }
    };
  }, [selectedSong]);

  useEffect(() => {
    if (!currentSong?.previewUrl || !audioRef.current) return;

    const audio = audioRef.current;
    audio.src = currentSong.previewUrl;
    audio.currentTime = 0;
    audio.play().catch(() => {
      setPlayingId(null);
    });
  }, [currentSong]);

  const handleSongClick = (song) => {
    if (!song.previewUrl || !audioRef.current) return;

    const audio = audioRef.current;
    const isCurrentSong = currentSong?.id === song.id;

    if (isCurrentSong) {
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
      return;
    }

    setCurrentSong(song);
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredSongs = songs.filter((song) => {
    if (!normalizedQuery) return true;

    const title = (song.title || "").toLowerCase();
    const artist = (song.artist || "").toLowerCase();
    const album = (song.album || "").toLowerCase();

    return (
      title.includes(normalizedQuery) ||
      artist.includes(normalizedQuery) ||
      album.includes(normalizedQuery)
    );
  });

  return (
    <section className="musicPlayer">
      <div className="musicPlayer__container">
        <h1 className="musicPlayer__title">Music Player</h1>
        <div className="musicPlayer__searchWrap">
          <input
            type="text"
            className="musicPlayer__search"
            placeholder="Search by song, artist, or album"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {loading && <p className="musicPlayer__status">Loading songs...</p>}
        {error && (
          <p className="musicPlayer__status musicPlayer__status--error">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="musicPlayer__layout">
            <div className="musicPlayer__list">
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song) => (
                  <button
                    key={song.id}
                    className={`musicPlayer__song ${
                      playingId === song.id ? "is-active" : ""
                    }`}
                    onClick={() => handleSongClick(song)}
                    disabled={!song.previewUrl}
                  >
                    <img
                      className="musicPlayer__artwork"
                      src={song.artwork}
                      alt={song.title}
                    />
                    <span className="musicPlayer__meta">
                      <strong>{song.title}</strong>
                      <small>{song.artist}</small>
                    </span>
                  </button>
                ))
              ) : (
                <p className="musicPlayer__empty">
                  No songs match your search.
                </p>
              )}
            </div>

            <div className="musicPlayer__panel">
              {currentSong ? (
                <>
                  <img
                    className="musicPlayer__panelArtwork"
                    src={currentSong.artwork}
                    alt={currentSong.title}
                  />
                  <h2 className="musicPlayer__songTitle">{currentSong.title}</h2>
                  <p className="musicPlayer__songArtist">{currentSong.artist}</p>
                  <audio
                    ref={audioRef}
                    controls
                    className="musicPlayer__audio"
                    onPlay={() => setPlayingId(currentSong.id)}
                    onPause={() => setPlayingId(null)}
                    onEnded={() => setPlayingId(null)}
                  />
                </>
              ) : (
                <p className="musicPlayer__status">
                  No playable preview found. Try refreshing.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
