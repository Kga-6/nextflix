import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faMagnifyingGlass , faCheck } from "@fortawesome/free-solid-svg-icons";

// context
import { useAppContext } from "../../context/AppContext";

// style
import "./Editor.css"

// data
import movie_list from "../../data/movie_list.json"
import tv_list from "../../data/tv_list.json"

//dataselect={"true"}

const Filter = () => {

  const {
    genres,
    certification,
    selected_genres,
    selected_cerfification,
    handleSelected_Genres,
    handleSelected_Cerfification
  } = useAppContext()

  return(
    <div className="filter-content option-content">
      <div className="filter_genres check-section">
        <label className="section-label">Genres</label>
        <div className="section-check">
          {
            genres.map((genre)=>{
              if(selected_genres.includes(genre.id)){
                return <div onClick={()=>{handleSelected_Genres(genre.id)}} key={genre.id} dataselect={"true"} className="check">{genre.name}</div>;
              }else{
                return <div onClick={()=>{handleSelected_Genres(genre.id)}} key={genre.id} className="check">{genre.name}</div>;
              }
            })
          }
        </div>
      </div>
      {/* <div className="filter_availabilities check-section">
        <label className="section-label">Availabilities</label>
        <div className="section-check">
          <div className="check" dataselect={"true"}>Free</div>
          <div className="check">Buy</div>
          <div className="check" dataselect={"true"}>Rent</div>
          <div className="check">Stream</div>
        </div>
      </div> */}
      <div className="filter_certification check-section">
        <label className="section-label">Certification</label>
        <div className="section-check">
          {
            certification.map((c)=>{
              if(selected_cerfification.includes(c.certification)){
                return <div onClick={()=>{handleSelected_Cerfification(c.certification)}} key={c.order} dataselect={"true"} className="check">{c.certification}</div>;
              }else{
                return <div onClick={()=>{handleSelected_Cerfification(c.certification)}} key={c.order} className="check">{c.certification}</div>;
              }
            })
          }
        </div>
      </div>
    </div>
  )
}

const Watch = () => {
  
  const {
    country,
    regions,
    services,
    selected_services,
    handleCountry,
    handlesSelected_Services
  } = useAppContext()

  return(
    <div className="watch-content option-content">
      <div className="watch_country option-section">
        <label className="section-label">Country</label>
        <select onChange={handleCountry} className="section-select" value={country}>
          {
            regions.map((region,index)=>{
              return <option key={region.iso_3166_1} value={region.iso_3166_1}>{region.native_name}</option>;
            })
          }
        </select>
      </div>
      <div className="watch-platform">

        {
          services.map((provider,index) => {
            if(Object.hasOwn(provider.display_priorities,country)){
              return (
                <button 
                  key={provider.provider_id} 
                  className="platform" 
                  onClick={()=>{handlesSelected_Services(provider.provider_id)}}
                  style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${provider.logo_path})`}}
                >
                  {
                    selected_services.includes(provider.provider_id)&&

                    <div className="platform-selected">
                      <FontAwesomeIcon className="check-icon" icon={faCheck} size="2x"/>
                    </div>
                  }
                </button>
              )
            }
          })
        }


      </div>
    </div>
  )
}

const Sort = () => {

  const {handleSort,handleType,type,sort} = useAppContext()

  return(
    <div className="sort-content option-content">
      <div className="sort_type option-section">
        <label className="section-label">Type</label>
        <select onChange={handleType} value={type} className="section-select">
          <option value="movie">Movies</option>
          <option value="tv">Tv Shows</option>
        </select>
      </div>

      <div className="sort_by option-section">
        <label className="section-label">Sort Results By</label>
        <select onChange={handleSort} value={sort} className="section-select">
          {
            type=="movie"?
              movie_list.map((data,index) => {
                return <option key={index} value={data.ApiType}>{data.Type}</option>
              })
            :
              tv_list.map((data,index) => {
                return <option key={index} value={data.ApiType}>{data.Type}</option>
              })
          }
        </select>
      </div>
      
    </div>
  )
}

const Editor = () => {

  const {handleSortSearch} = useAppContext()

  const [sortShow,setSortShow] = useState(false)
  const [watchShow,setWatchShow] = useState(false)
  const [filterShow,setFilterShow] = useState(false)
  const watchRef = useRef(null)

  const handleSort = () => {
    setSortShow(!sortShow)
    setWatchShow(false)
    setFilterShow(false)
  }

  const handleWatch = () =>{
    setWatchShow(!watchShow)
    setFilterShow(false)
    setSortShow(false)
  }
 
  const handleFilter = () => {
    setFilterShow(!filterShow)
    setSortShow(false)
    setWatchShow(false)
  }

  // useEffect(()=>{
  //   if(watchRef.current == null) return;

  //   if(watchShow==true){
  //      watchRef.current.style.flexGrow = 1
  //   }else{
  //     watchRef.current.style.flexGrow = "inherit"
  //   }
  // },[watchShow])

  return(
    <div className='editor'>
      <div className='editor-content'>

        <div className='sort editor-option'>
          <div onClick={handleSort} className="option-header">
            <label className="option-label">Sort</label>
            <FontAwesomeIcon className="option-icon" rotation={sortShow?180:0} icon={faCaretDown} />
          </div>
          {sortShow&&<Sort/>}
        </div>

        <div ref={watchRef} className='watch editor-option'>
          <div onClick={handleWatch} className="option-header">
            <label className="option-label">Where To Watch</label>
            <FontAwesomeIcon className="option-icon" rotation={watchShow?180:0} icon={faCaretDown} />
          </div>
          {watchShow&&<Watch/>}
        </div>

        <div className='filter editor-option'>
          <div onClick={handleFilter} className="option-header">
            <label className="option-label">Filters</label>
            <FontAwesomeIcon className="option-icon" rotation={filterShow?180:0} icon={faCaretDown} />
          </div>
          {filterShow&&<Filter/>}
        </div>

        <button onClick={handleSortSearch} className="editor-search">
          <label className="search-label">Search</label>
        </button>

      </div>
    </div>
  )
}

export default Editor