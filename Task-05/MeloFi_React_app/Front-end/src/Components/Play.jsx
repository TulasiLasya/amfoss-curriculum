import { useEffect, useState } from "react";
import { FiPlay } from "react-icons/fi";
import { FiPause } from "react-icons/fi";
import "../Style/Play.css"
import { useRef } from "react";

function Play({url}){
    const [Playing , setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {audioRef.current = new Audio();
        return () =>{
            if (audioRef.current){
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [])

    useEffect(()=>{
        if (!audioRef.current || !url){
            console.log("Setting audio for song:" , url);
            audioRef.current.src = url;
            audioRef.current.load();
            setIsPlaying(false);
        }
    },[url])

     const togglePlay = () => {
    if (!audioRef.current || !url) {
      console.error("No audio element or URL");
      return;
    }
    
    if (Playing) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          console.log("Playing audio");
        })
        .catch(error => {
          console.error("Playback error:", error);
          setIsPlaying(false);
        });
    }
  };

     const handleClicked = () => {
       setIsPlaying(!Playing);

     }

    return (
     <button 
      onClick={togglePlay}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '40px',
        color: 'white'
      }}
    >
      {Playing ? <FiPause onClick={handleClicked} className="color"/> : <FiPlay onClick={handleClicked} className="color"/>}
    </button>
  );

}

export default Play;