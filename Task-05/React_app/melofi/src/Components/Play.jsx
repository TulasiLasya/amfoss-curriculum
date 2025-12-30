import { useState } from "react";
import { FiPlay } from "react-icons/fi";
import { FiPause } from "react-icons/fi";


function Play(){
    const [played , setplayed] = useState(false);
    const handleClicked = () => {
        setplayed(!played);

    };
    if(played) 
        return <FiPause onClick={handleClicked} color="white"/>
    return <FiPlay onClick={handleClicked} color="white"/>
}

export default Play;