import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";

function LikeIcon() {
  const [liked, setLiked] = useState(false);
  const handleClicked = () => {
    setLiked(!liked);
  };
  if (liked)
    return <AiFillLike color="black" size="25" onClick={handleClicked} />;
  return <AiOutlineLike color="black"size="25" onClick={handleClicked} />;
}

export default LikeIcon;