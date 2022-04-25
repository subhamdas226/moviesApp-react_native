import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const api_key = 'api_key=535fec9eeec71960939491907b13a0f2&language=en-US&page=1';

export const getPopularMovies = async () =>{
  const resp = await axios.get(
      `${apiUrl}/movie/popular?${api_key}`
      );
  // console.log(JSON.stringify(resp.data.results[0], null, 2))
  return resp.data.results;
}

export const getUpcomingMovies = async () =>{
    const resp = await axios.get(
        `${apiUrl}/movie/upcoming?${api_key}`
        );
    // console.log(JSON.stringify(resp.data.results[0], null, 2))
    return resp.data.results;
  }

  export const getPopularTv= async () =>{
    const resp = await axios.get(
        `${apiUrl}/tv/popular?${api_key}`
        );
    return resp.data.results;
  }

  export const getFamilyMovies= async () =>{
    const resp = await axios.get(
        `${apiUrl}/discover/movie?${api_key}&with_genres=10751`
        );
    return resp.data.results;
  }

  export const getDocumentaryMovies= async () =>{
    const resp = await axios.get(
        `${apiUrl}/discover/movie?${api_key}&with_genres=99`
        );
    return resp.data.results;
  }
  export const getMovie= async (id) =>{
    const resp = await axios.get(
        `${apiUrl}/movie/${id}?${api_key}`
        );
    return resp.data;
  }

// Search movies and Tv shows
export const searchMovieTv = async ( query, type) =>{
    const resp = await axios.get(
        `${apiUrl}/search/${type}?${api_key}&query=${query}`
        );
      console.log(resp.data.results)
    return resp.data.results;
  }