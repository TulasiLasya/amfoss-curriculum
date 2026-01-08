import "../Style/Album.css"


function Albumcard({ songs, albumname }) {
  const coverSongs = songs.slice(0, 4); // first 4 songs

  return (
    <div className="album-card">
      <div className="album-cover-grid">
        {coverSongs.map((song, _id) => (
          <img
            key={_id}
            src={song.songBanner}
            alt={song.songname}
            className="album-cover-img"
          />
        ))}
      </div>

      <h1 className="album-title">{albumname}</h1>
      <h1 className="album-subtitle">{songs.length} songs</h1>
    </div>
  );
}

export default Albumcard;
