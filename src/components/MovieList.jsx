import React, { useEffect, useState } from 'react'
import { API } from '../global'
import { Link } from 'react-router-dom'
import { deleteMovie } from '../store/action/movieActions'
import { useDispatch } from 'react-redux'

function MovieList({token}) {
    const [movie, setMovie] = useState([])
    const dispatch = useDispatch();

    async function fetchMovieList() {
        await fetch(`${API}/movie/all`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token':token
            },
          }).then((res) => res.json())
          .then((data) => {
              console.log(data)
              setMovie(data.movie);
          })
          .catch((error) =>
              console.error(error)
          )
    }
    useEffect(() => { fetchMovieList() }, [])

  return (
    <div className='container m-4'>
    <h2 className='container text-center text-light' style={{paddingTop:"100px"}}>Movies List</h2>
    <div className='text-center'><Link to={'/movie/create'} className='text-light'>Create Movie</Link></div>
        <div className='d-flex flex-wrap justify-content-around '>
            {movie && movie.map((data, index) => (
                <div key={index} className='card p-4 m-4' style={{ width: "20rem" }}>
                    {data && data.poster && (<img src={data.poster} className="movie-img" alt="..." />)}
                    <div className="card-body">
                        {data && data.poster && (<div className='d-flex justify-content-between'><h3 className="card-title">{data.movieName}</h3>
                        <Link to={`/movie/edit/${data.movieName}`}>Edit Movie</Link><Link onClick={async()=>{await dispatch(deleteMovie(data._id));fetchMovieList();}} style={{textDecoration:"none"}}>🗑️</Link></div>)}
                        {data && data.plot && (<p className="card-text">{data.plot}</p>)}
                        {data && data.yearOfRelease && (<p className="card-text"><b>Year:</b> {data.yearOfRelease}</p>)}
                        {data && data.producer && (<p className="card-text"><b>Producer:</b> {data.producer.producerName}</p>)}
                        {data && (<p className='card-text'><b>Stars: </b>
                            {data.actors.map((actor) => (
                                <span className="card-text" key={actor.actorName}>{actor.actorName} </span>
                            ))}
                        </p>)}
                    </div>
                </div>
            ))}
        </div>
</div>
  )
}

export default MovieList