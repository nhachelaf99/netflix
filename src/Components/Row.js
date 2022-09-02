import React, {useEffect, useState} from 'react'
import "../Styles/Row.css"
import axios from 'axios'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'


const base_url = "https://image.tmdb.org/t/p/w500"


function Row( {title, fetchUrl, isLargeRow} ) {

    const [trailerUrl, setTrailerUrl] = useState("")
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl("")
        }else {
            movieTrailer(movie?.name || "")
            .then((url) =>{
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get("v"))
            })
            .catch((error) => console.log(error))
        }
    }

    const [movies, setMovies] = useState([])
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(`https://api.themoviedb.org/3${fetchUrl}`);
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl])

    const movieBox = movies.map(movie => {
        return(
            <div>
                <img 
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}` } 
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                alt={movie.name}></img>
            </div>
        )
    })

  return (
    <div className='row'>
        <h2>{title}</h2>
        <div className='row__posters'>
        {movieBox}
        </div>
        <div className='movie__trailer'>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    </div>
  )
}

export default Row