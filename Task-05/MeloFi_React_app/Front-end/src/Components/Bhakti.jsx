// import { useState } from "react";
// import { useEffect } from "react";
// import Albumcard from "./Albumcard";

// function Bhakti() {
//   const [bhaktisongs, setBhaktisongs] = useState([]);
//   useEffect(() => {
//     fetch("https://free-music-api2.vercel.app/album/bhakti")
//       .then((res) => res.json)
//       .then((data) => setBhaktisongs(data));
//   }, []);

//   return (
//     <>
//       {bhaktisongs.length > 0 && (
//         <Albumcard bhaktisongs={bhaktisongs} albumname="Bhakti" />
//       )}
//     </>
//   );
// }

// export default Bhakti();
