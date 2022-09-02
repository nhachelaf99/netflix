import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "../Styles/Banner.css"

function Banner({fetchUrl}) {

    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(`https://api.themoviedb.org/3${fetchUrl}`)
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)])
            return request
        }
        fetchData()
    }, [fetchUrl])
    
    function truncate(str, max) {
        return str?.length > max ? str.substr(0, max-1) + '…' : str;
      }

  return (
    <header 
    style={{
        backgroundSize: "cover",
        backgroundImage:`url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center center"
    }}
    className='banner'>
        <div className='banner__content'>
            <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
            <div className='banner__buttons'>
                <button className='banner__button'>Play</button>
                <button className='banner__button'>My List</button>
            </div>
            <h1 className='banner__description'>{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className='banner--fadeBottom'></div>
    </header>
    
  )
}

export default Banner