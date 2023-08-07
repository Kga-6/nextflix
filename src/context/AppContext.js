import React, {useContext,createContext,useState, useEffect} from "react";
import { 
  available_regions, 
  watch_providers, 
  genres_list, 
  certification_list,
  discover,
  fetch_details,
  sort_search
} from "../utili/fetch";

const AppContext = createContext(null)
const EditorContext = createContext(null)

export default function AppProvider({children}){

  const [frameShow,setFrameShow] = useState(false)
  const [bookmarkShow,setBookMark] = useState(false)

  // states for editor sort
  const [type,setType] = useState("movie") // [movie,tv]
  const [sort,setSort] = useState("popular")
  const [rank,setRank] = useState("popularity.desc")

  // states for editor watch
  const [country,setCountry] = useState("US")
  const [regions,setRegions] = useState([])
  const [services,setServices] = useState([]) 
  const [selected_services,setSelected_Services] = useState([])

  // states for editor filter
  const [genres,setGenres] = useState([])
  // const [availabilities,setAvailabilities] = useState([])
  const [certification,setCertification] = useState([])
  const [selected_genres,setSelected_Genres] = useState([])
  const [selected_cerfification,setSelected_Cerfification] = useState([])

  const [searching,setSearching] = useState(false)
  const [loadingMore,setLoadingMore] = useState(false)

  // when loadmore is called we dont have to start at pages we looped through
  // resets when sort,watch,filter changes
  const [page,setPage] = useState(1) 

  const [titles,setTitles] = useState([])
  const [details,setDetails] = useState([])

  useEffect(()=>{

    async function fetchRegions(){
      try {
        const fetch = await available_regions();
        setRegions(fetch.results)
      } catch (err) {
        console.error(err);
      }
    }

    fetchRegions()
    
    handleServices(type)
    handleGenres(type)
    handleCerfification(type)
    setTitles([])
    handleSortSearch()
    

  },[])

  // ~~ functions ~~ //

  const  handleFrameShow =  async (title_id) =>{
    setFrameShow(true)

    const data = await fetch_details(type,title_id)
    setDetails(data)
    console.log(data)
  }


  const handleSortSearch = async () => {
    const data = await discover(
      type,
      sort,
      selected_services,
      selected_genres,
      selected_cerfification,
      1,
      rank
    )

    setPage((old_value)=> old_value+1)
    setTitles(data.results)
  }

  const handleLoadMore = async () => {
    console.log("searching for more!",page)
    const data = await discover(
      type,
      sort,
      selected_services,
      selected_genres,
      selected_cerfification,
      page,
      rank
    )

    setPage((old_value)=> old_value+1)
    setTitles(
      [
        ...titles,
        ...data.results
      ]
    )
  }

  const handleServices = async (type) => {
    try{
      const fetch = await watch_providers(type)
      setServices(fetch.results)
    } catch(err) {
      console.log(err)
    }
  }

  const handleGenres = async (type) => {
    try{
      const fetch = await genres_list(type)
      setGenres(fetch.genres)
    } catch(err){
      console.log(err)
    }
  }

  const handleCerfification = async (type) => {
    try{
      const fetch = await certification_list(type)
      setCertification(fetch.certifications["US"])
    } catch(err){
      console.log(err)
    }
  }

  const handleCountry = async (e) => {
    setCountry(e.target.value)
    setSelected_Services([])
    setPage(1)
  }

  const handleSelected_Genres = (id) => {
    if(selected_genres.includes(id)){
      const array = selected_genres.filter((value)=> value !== id)
      setSelected_Genres(array)
    }else{
      setSelected_Genres(
        [
          ...selected_genres,
          id
        ]
      )
    }
    setPage(1)
  }

  const handlesSelected_Services = (id) => {
    if(selected_services.includes(id)){
      const array = selected_services.filter((value)=> value !== id)
      setSelected_Services(array)
    }else{
      setSelected_Services(
        [
          ...selected_services,
          id
        ]
      )
    }
    setPage(1)
  }

  const handleSelected_Cerfification = (id) => {
    if(selected_cerfification.includes(id)){
      const array = selected_cerfification.filter((value)=> value !== id)
      setSelected_Cerfification(array)
    }else{
      setSelected_Cerfification(
        [
          ...selected_cerfification,
          id
        ]
      )
    }
    setPage(1)
  }
  const handleBookmark = () => {
    if(bookmarkShow){
      document.body.classList.remove('disable-scroll');
      setBookMark(false)
    }else{
      document.body.classList.add('disable-scroll');
      setBookMark(true)
      setFrameShow(false)
    }
  }

  const handleFrame = () => {
    if(frameShow){
      document.body.classList.remove('disable-scroll');
      setFrameShow(false)
    }else{
      document.body.classList.add('disable-scroll');
      setFrameShow(true)
      setBookMark(false)
    }
  }

  const handleType = (e) => {

    setType(e.target.value)
    setSort(e.target.value=="movie"?"now_playing":"airing_today")
    setSelected_Services([])
    setSelected_Genres([])
    setSelected_Cerfification([])
    setPage(1)

    handleServices(e.target.value)
    handleGenres(e.target.value)
    handleCerfification(e.target.value)
  }

  const handleSort = (e) => {
    console.log(e.target.value)
    setSort(e.target.value)
    setPage(1)
  }

  const handleRank = (e) => {
    console.log(e.target.value)
    setRank(e.target.value)
    setPage(1)
  }

  return(
    <AppContext.Provider
      value={
        {
          titles,
          bookmarkShow,
          frameShow,
          regions,
          services,
          country,
          type,
          sort,
          selected_services,
          genres,
          selected_genres,
          certification,
          selected_cerfification,
          details,
          rank,

          // Functions
          handleSort,
          handleSortSearch,
          handleBookmark,
          handleFrame,
          handleType,
          handleCountry,
          handlesSelected_Services,
          handleSelected_Genres,
          handleSelected_Cerfification,
          handleLoadMore,
          handleFrameShow,
          handleRank
        }
      }
    >
      {children}
    </AppContext.Provider>
  )

}

export function useAppContext(){
  return useContext(AppContext)
}