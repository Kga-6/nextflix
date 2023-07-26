import React, { useContext } from "react";

// context
import { useAppContext } from "../../context/AppContext";

// styles
import "./Titles.css"

// components
import Title from "../../components/title/Title";

const Titles = () => {

  const {titles,handleLoadMore} = useAppContext()

  return(
    <div className="results">
      <div className="results-content">
        {
          titles.map((title,index)=>{
            return <Title key={index} data={title}></Title>
          })
        }
        {titles.length<=0&&<p>No items were found that match your query.</p>}
      </div>

      <div className="results-more-container">
        <button onClick={handleLoadMore} className="results-more">LOAD MORE</button>
      </div>

    </div>
  )
}

export default Titles