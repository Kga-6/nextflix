import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// context
import { useAppContext } from "../../context/AppContext";

// styles
import "./Bookmark.css"

const Bookmark = () => {

  const {handleBookmark,bookmarkShow} = useAppContext()

  return(
    <>
      {bookmarkShow&&

        <div className="bookmark">
          <div className="bookmark-content">
            <header className="bookmark-header">
              <button onClick={handleBookmark} className="bookmark-close">
                <FontAwesomeIcon className="close-icon" icon={faXmark} size="xl" />
              </button>
              <label className="bookmark-title">Bookmark</label>
            </header>
            <div className="bookmark-container">
              
              <div className="bookmarked">
                <button className="marked-remove">
                  <FontAwesomeIcon icon={faXmark} size="lg"/>
                </button>
                <img className="bookmark-poster" src="https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6408f6e7b5811271dc883aa8_batman-min.png"></img>
                <h1 className="marked-title">Spider-man - another world!</h1>
              </div>
    
              <div className="bookmarked">
                <button className="marked-remove">
                  <FontAwesomeIcon icon={faXmark} size="lg"/>
                </button>
                <img className="bookmark-poster" src="https://assets.mubicdn.net/images/notebook/post_images/34516/images-w1400.jpg?1639064588"></img>
                <h1 className="marked-title">Lamb Of God</h1>
              </div>
    
            </div>
            <p className="bookmark-empty">You don't have anything bookmarked</p>
    
          </div>
        </div>

      }
    </>
    
  )
}

export default Bookmark