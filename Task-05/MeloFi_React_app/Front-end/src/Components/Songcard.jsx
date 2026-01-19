import "../Style/Trending.css"


function Songcard({songBanner, songName, singer,url}){
    return (
        <>
        <div>
            <img className="img-container" src={songBanner} alt={songName} />
            <h4>{songName}</h4>
            <p>{singer}</p>
            
            <audio controls>
                <source src={url}/>
            </audio>
         </div>
        </>
    );
}

export default Songcard;