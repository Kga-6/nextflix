import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

// context
import { useAppContext } from "../../context/AppContext";

// styles
import "./Header.css"

const Header = (props) => {

  const {handleBookmark} = useAppContext()
  
  return(
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <div className="logo-text">Nextflix</div>
        </div>
        <input className="search-input" type="text" placeholder="Search for movies, and tv-show"></input>
        <button onClick={handleBookmark} className="bookmark-btn">
          <FontAwesomeIcon className="booknark-icon" icon={faBookmark}/>
          <span className="bookmark-label">Bookmarks</span>
        </button>
      </div>
    </header>
  )
}

export default Header