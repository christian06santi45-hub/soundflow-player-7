const ITUNES_SEARCH_URL = "https://itunes.apple.com/search";

function mapTrack(track) {
  return {
    id: track.trackId,
    title: track.trackName || "Unknown Title",
    artist: track.artistName || "Unknown Artist",
    album: track.collectionName || "Unknown Album",
    artwork:
      track.artworkUrl100 ||
      track.artworkUrl60 ||
      "https://placehold.co/300x300?text=No+Art",
    previewUrl: track.previewUrl || null,
    releaseDate: track.releaseDate || null,
  };
}

export async function getLatestSongs(limit = 20) {
  const safeLimit = Number.isFinite(limit)
    ? Math.max(1, Math.min(50, Math.floor(limit)))
    : 20;

  const params = new URLSearchParams({
    term: "new music",
    media: "music",
    entity: "song",
    country: "US",
    limit: String(safeLimit),
  });

  const response = await fetch(`${ITUNES_SEARCH_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Music request failed (${response.status})`);
  }

  const data = await response.json();

  if (!Array.isArray(data.results)) {
    throw new Error("Music service returned an invalid response");
  }

  return data.results
    .filter((track) => track && track.trackId)
    .map(mapTrack);
}
