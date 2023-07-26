import React, {useState,useEffect,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlay, faBookmark } from "@fortawesome/free-solid-svg-icons";

// context
import { useAppContext } from "../../context/AppContext";

// style
import "./Frame.css"

const short_test = "This is the new title component. Working on making everthing 101% better!"
const long_test = "This is the new title component.This is the new title component.This is the new title component.This is the new title component.This is the new title component.This is the new title component This is the new title component.This is the new title component.This is the new title component.This is the new title component.This is the new title component.This is the new title component.This is the new title component.This is the new title component.This is the new title component.This is the new title component.This is the new title component.This is the new title component.This is the new title component..This is the new title component. Working on making everthing 101% better! This is the new title component. Working on making everthing 101% better!This is the new title component. Working on making everthing 101% better! This is the new title component. Working on making everthing 101% better! This is the new title component. Working on making everthing 101% better!"
 
const Frame = () => {

  const {handleFrame,frameShow} = useAppContext()

  const [showDesc,setShowDesc] = useState(false)
  const descRef = useRef(null)
  
  const handleDesc = () => {
    if(descRef.current == null) return;

    setShowDesc(!showDesc)

    if(!showDesc){
      descRef.current.style.display = "block"
    }else{
      descRef.current.style.display = "-webkit-box"
    }
  }

  return(
    <>
      {frameShow&&

        <div className="frame">
          <div className="frame-content">
            <div className="frame-container">
              <button onClick={handleFrame} className="frame-close">
                <FontAwesomeIcon className="close-icon" icon={faXmark} size="xl" />
              </button>
              <div className="frame-backdrop">
                <div className="frame-bd-color"></div>
              </div>
              <div className="frame-info">

                <div className="frame-poster-container">
                  <img className="frame-poster" src="https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6408f6e7b5811271dc883aa8_batman-min.png"></img>
                </div>
                <div className="frame-ntg">

                  <div className="frame-ea">
                    <button className="frame-trailer">
                      <FontAwesomeIcon className="play-icon frame-btn-icon" icon={faPlay} size="sm" />
                      Trailer
                    </button>
                    <button className="frame-bookmark">
                      <FontAwesomeIcon className="heart-icon" icon={faBookmark} size="sm" />
                    </button>
                  </div>

                  <h1 className="frame-name">Spider-man - another world!</h1>
                  <div className="frame-data-container">
                    {/* <p className="frame-rated">PG-13</p> */}
                    <p className="frame-data"> <span className="frame-rated">PG-13</span> 07/07/2023 (US) | Romance, Action, Comedy | 1h 35m</p>
                  </div>

                </div>
              </div>
              <div className="frame-details">
                
                <div className="frame-overview frame-seacion">
                  <h1 className="frame-sl">Overview</h1>
                  <div onClick={handleDesc} className="frame-desc-container">
                    <p ref={descRef} className="frame-description">{long_test}</p>
                    <div className="frame-desc-label" >{showDesc?"Show less":"Show more"}</div>
                  </div>
                  {/* <p ref={descRef} onClick={handleDesc} className="frame-description">{long_test}</p> */}
                </div>

                <div className="frame-platform frame-seacion">
                  <h1 className="frame-sl">Services</h1>
                  <div className="frame-platforms-container">
                    <div className="frame-platform">
                      <img className="platform-icon" src="https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456"></img>
                    </div>
                    <div className="frame-platform">
                      <img className="platform-icon" src="https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456"></img>
                    </div>
                  </div>
                </div>

                <div className="frame-actors frame-seacion">
                  <h1 className="frame-sl">Featured Actors</h1>
                  <div className="frame-actors-container">
                    
                    <div className="actor">
                      <img className="actor-picture" src="https://img.mensxp.com/media/content/2019/Apr/background-dancers-who-became-known-bollywood-actors1400-1556545997.jpg"></img>
                    </div>

                  </div>
                </div>

              
              </div>
            </div>
          </div>
        </div>

      }
    </>
  )
}

export default Frame