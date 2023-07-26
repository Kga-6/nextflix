import React, {useEffect,useState,useRef} from "react";
import ColorThief from 'colorthief';

// style
import "./Title.css"
import img from "./image.jpg"


const short_test = "This is the new title component. Working on making everthing 101% better!"
const long_test = "This is the new title component. Working on making everthing 101% better! This is the new title component. Working on making everthing 101% better!This is the new title component. Working on making everthing 101% better! This is the new title component. Working on making everthing 101% better! This is the new title component. Working on making everthing 101% better!"

const Title = (props) => {

  const imgRef = useRef()
  const [color,setColor] = useState([0,0,0]) // (RGB) White by default
  const {data} = props

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

  let year = null
  if(data.first_air_date){year = data.first_air_date.split("-")[0]}
  if(data.release_date){year = data.release_date.split("-")[0]}


  return(
    <div className="title" style={{backgroundImage:`url(https://image.tmdb.org/t/p//w500${data.backdrop_path})`}}>
      <div className="title-bg-color" style={{background:`linear-gradient(to right,rgb(${color}, 1),rgba(255, 255, 255, 0))`}}></div>
      <div className="title-content">
        <div className="title-image-container">
          <img className="title-image" src={`https://image.tmdb.org/t/p//w500${data.poster_path}`}></img>
        </div>
        <div className="title_info">
          <h1 className="title_name">{data.original_title?data.original_title:data.name}</h1>
          <p className="title_quote">{data.title}</p>
          {data.certification&&<p className="title_rated">{data.certification}</p>}
          <ul className="title_meta">
            <li className="title_date mete-li">{data.original_title?"Movie":"Tv Show"}</li>
            {year&&<li className="title_date mete-li">{year}</li>}
            <li className="title_date mete-li">{data.original_language.toUpperCase()}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Title