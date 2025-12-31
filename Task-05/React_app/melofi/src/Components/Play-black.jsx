import { useState } from "react";
import { FiPlay } from "react-icons/fi";
import { FiPause } from "react-icons/fi";

function Playblack(){
    const [played , setplayed] = useState(false);
    const handleClicked = () => {
        setplayed(!played);

    };
    if(played) 
        return <FiPause onClick={handleClicked} color="black"/>
    return <FiPlay onClick={handleClicked} color="black"/>
}

export default Playblack;