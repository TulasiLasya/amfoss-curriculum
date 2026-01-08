import { useState } from "react";
import { FiPlay } from "react-icons/fi";
import { FiPause } from "react-icons/fi";
import "../Style/Play.css"

function Play(){
    const [played , setplayed] = useState(false);
    const handleClicked = () => {
        setplayed(!played);

    };
    if(played) 
        return <FiPause onClick={handleClicked} className="color"/>
    return <FiPlay onClick={handleClicked} className="color"/>
}

export default Play;