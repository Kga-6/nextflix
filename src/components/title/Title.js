import React, {useEffect,useState,useRef} from "react";
import ColorThief from 'colorthief';

// context
import { useAppContext } from "../../context/AppContext";

// style
import "./Title.css"
import img from "./image.jpg"

const Title = (props) => {

  const {data} = props
  const {genres,handleFrameShow} = useAppContext()

  const [color,setColor] = useState([0,0,0]) // (RGB) White by default
  const [genres_list,setGenres] = useState([])
  const [year,setYear] = useState("00/00/00")


  // useEffect(() => {
  //   const colorThief = new ColorThief();

  //   // Wait for the image to load before extracting color
  //   const handleImageLoad = () => {
  //     try {
  //       // Access the underlying HTMLImageElement from the useRef() object
  //       const imageElement = imgRef.current;
  //       const colorPalette = colorThief.getColor(imageElement);
  //       setColor(colorPalette);
  //     } catch (error) {
  //       console.error('Error extracting color from image:', error);
  //       setColor([255, 0, 0]);
  //       // Handle the error or set a fallback color
  //     }
  //   };

  //   // Attach the event listener for the image load
  //   imgRef.current.addEventListener('load', handleImageLoad);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     imgRef.current.removeEventListener('load', handleImageLoad);
  //   };
  // }, []);


  useEffect(()=>{
    
    if(data.first_air_date){setYear(`${data.first_air_date.split("-")[1]}/${data.first_air_date.split("-")[2]}/${data.first_air_date.split("-")[0]}`)}
    if(data.release_date){setYear(`${data.release_date.split("-")[1]}/${data.release_date.split("-")[2]}/${data.release_date.split("-")[0]}`)}

    const genresMap = genres.reduce((map, genre) => {
      map[genre.id] = genre
      return map
    }, {})
    
    const list = data.genre_ids.map(id => genresMap[id])
    
    setGenres(list)
    console.log(list)

  },[])

  return(
    <div onClick={()=>{handleFrameShow(data.id)}} className="title" style={{backgroundImage:`url(https://image.tmdb.org/t/p//w500${data.backdrop_path})`}}>
      <div className="title-bg-color" style={{background:`linear-gradient(to right,rgb(${color}, 1),rgba(255, 255, 255, 0))`}}></div>
      <div className="title-content">
        <div className="title-image-container">
          <img className="title-image" src={`https://image.tmdb.org/t/p//w500${data.poster_path}`}></img>
        </div>
        <div className="title_info">
          <h1 className="title_name">{data.original_title?data.original_title:data.name}</h1>
          <p className="title_quote">{year}</p>
          {/* {data.certification&&<p className="title_rated">{data.certification}</p>} */}
          <ul className="title_meta">
            <li className="mete-li">{data.original_title?"Movie":"Tv Show"}</li>
            {
              genres_list&&
              genres_list.map((genre)=>{
                return genre && <li key={genre.id} className="mete-li">{genre.name}</li>
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Title