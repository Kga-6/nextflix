const auth = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDg2Mzk0NjQ0OThjZjU4OGI4M2VjODQzYjI1N2EzZCIsInN1YiI6IjY0ODdkNzFkZTI3MjYwMDBlOGMyMzRlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RX6-ZttCKcNFaxwqrRp0D8Ic5h1jg9H5InJ6ugE-ABw"

const get_options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: auth
  }
};

function check_genres(title,genres){
 
  let hasGenre = false

  title.genre_ids.forEach((genre_id)=>{
    if(genres.includes(genre_id)){
      hasGenre = true
    }
  })

  return hasGenre
}

async function fetch_cerfifications(type,title_id){
  if(type == "movie"){
    // https://api.themoviedb.org/3/movie/${title_id}/release_dates
    try{

      const response = await (async () => {
        const fetchResponse = await fetch(`https://api.themoviedb.org/3/movie/${title_id}/release_dates`, get_options);
        return fetchResponse.json();
      })();
        
      return response
    } catch(err){
      console.log(err)
      throw err
    }
  }else if(type == "tv"){
    // https://api.themoviedb.org/3/tv/${title_id}/content_ratings
    try{

      const response = await (async () => {
        const fetchResponse = await fetch(`https://api.themoviedb.org/3/tv/${title_id}/content_ratings`, get_options);
        return fetchResponse.json();
      })();
        
      return response
    } catch(err){
      console.log(err)
      throw err
    }
  }
}

async function get_cerfification(type,title_id,country){
  const fetch = await fetch_cerfifications(type,title_id)

  let certification = null

  for(let [_,results] of Object.entries(fetch)){

    for(let [_,data] of Object.entries(results)){
      if(data.iso_3166_1 == country){
        if(type == "movie"){
          certification = data.release_dates[0].certification
        }else if(type == "tv"){
          certification = data.rating
        }

      }
    }
    
  }

  return certification
}

// demo testing - improving later on
export const sort_search = async (type,sort,services,genres,cerfifications,page) => {

  const country = "US"
  const max_titles = 25
  let attempts = 0  
  let page_index = page
  const titles = [] 

  async function fetch_titles(){
    try{

      const response = await (async () => {
        const fetchResponse = await fetch(`https://api.themoviedb.org/3/${type}/${sort}?page=${page_index}`, get_options);
        return fetchResponse.json();
      })();
        
      return response
    } catch(err){
      console.log(err)
      throw err
    }
  }

  async function fetch_providers(title_id){
    try{

      const response = await (async () => {
        const fetchResponse = await fetch(`https://api.themoviedb.org/3/${type}/${title_id}/watch/providers`, get_options);
        return fetchResponse.json();
      })();
        
      return response
    } catch(err){
      console.log(err)
      throw err
    }
  }

  async function checkRequirements(title) {

    console.log("searching...",`[${page}]`)

    try {
      const all = []
      let approved = false

      if(services.length > 0){

        const providersResponse = await fetch_providers(title.id);
        if(providersResponse.results.length == 0) return false;
        if(providersResponse.results[country] == undefined) return false;
        const results = providersResponse.results[country]

        for(let [priceType,platforms] of Object.entries(results)){
          if(typeof platforms == "object"){
            platforms.map((platform)=>{
              all.push(platform.provider_id)
            })
          }
        }
  
        services.forEach((platform_id)=>{
          if(all.includes(platform_id)){

            if(genres.length > 0 && cerfifications.length > 0){
              const approved_genre = check_genres(title,genres)
              const approved_cert = cerfifications.includes(title.certification)
              if(approved_cert == true && approved_genre == true){
                approved = true
              }
            }else if(genres.length > 0){
              approved = check_genres(title,genres)
            }else if(cerfifications.length > 0){
              approved = cerfifications.includes(title.certification)
            }else{
              approved = true
            }
            
          }
        })
      }else if(genres.length > 0 && cerfifications.length > 0){
        const approved_genre = check_genres(title,genres)
        const approved_cert = cerfifications.includes(title.certification)
        if(approved_cert == true && approved_genre == true){
          approved = true
        }
      }else if(genres.length > 0){
        approved = check_genres(title,genres)
      }else if(cerfifications.length > 0){
        approved = cerfifications.includes(title.certification)
      }

      return approved

    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  while (titles.length < max_titles) {
    try {
      const response = await fetch_titles();
      const { results } = response;

      for (const title of results) {

        const cert = await get_cerfification(type,title.id,country)
        title["certification"] = cert

        if(services.length > 0 || genres.length > 0 || cerfifications.length > 0){ // fetch for a certain watch or filter
          const approved = await checkRequirements(title);
          if (approved) {
            titles.push(title);
          }
        }else{
          titles.push(title);
        }

        if (titles.length >= max_titles) {
          break;
        }

      }

      // stop fetching after 3 pages attempts
      // avoid looking for titles for a long time and return what we got
      if(attempts==12){
        console.log(`failed to find ${max_titles} titles that met requirements`)
        break
      }

      if (titles.length >= max_titles) {
        break;
      }
      
      page_index++;
      attempts++
    } catch (err) {
      console.log(err);
      break;
    }
  }
  
  const data = {
    titles:titles,
    page_index
  }

  return data

}

export const available_regions = async () => {

  try {
    const response = await (async () => {
      const fetchResponse = await fetch('https://api.themoviedb.org/3/watch/providers/regions', get_options);
      return fetchResponse.json();
    })();

    return response; // If you want to return the response
  } catch (err) {
    console.error(err);
    throw err;
  }

};

export const watch_providers = async (type) => {

  try{
    const response = await (async () => {
      const fetchResponse = await fetch(`https://api.themoviedb.org/3/watch/providers/${type}`, get_options);
      return fetchResponse.json();
    })();

    return response; // If you want to return the response
  } catch(err) {
    console.log(err)
    throw err;
  }

}

export const genres_list = async (type) => {

  try{
    const response = await (async () => {
      const fetchResponse = await fetch(`https://api.themoviedb.org/3/genre/${type}/list`, get_options);
      return fetchResponse.json();
    })();

    return response
  } catch(err){
    console.log(err)
    throw err
  }

}

export const certification_list = async (type) => {

  try{
    const response = await (async () => {
      const fetchResponse = await fetch(`https://api.themoviedb.org/3/certification/${type}/list`, get_options);
      return fetchResponse.json();
    })();

    return response
  } catch(err){
    console.log(err)
    throw err
  }

}