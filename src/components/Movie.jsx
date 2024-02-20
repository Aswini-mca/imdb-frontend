import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../global'

function Movie() {
    const [movie, setMovie] = useState([])
    const { movieName } = useParams()
    const formattedMovieName = movieName.charAt(0).toUpperCase() + movieName.slice(1);

    async function fetchMovie() {
        await fetch(`${API}/movie-by-name/${formattedMovieName}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setMovie([data.movie]);
            })
            .catch((error) =>
                console.error(error)
            )
    }
    useEffect(() => { fetchMovie() }, [movieName])
    console.log(movie)
    return (
        <div className='m-5'>
            <h2 className='container text-center text-light p-4'>Movie Details</h2>
            {movie.length === 0 ? (
                <h1 className="text-center bg-light container">Movie is not available in the database</h1>
            ) : (
                <div className='d-flex flex-wrap justify-content-between '>
                    {movie.map((data, index) => (
                        <div key={index} className='card p-4 m-4 mx-auto' style={{ width: "400px" }}>
                            {data && data.poster && (<img src={data.poster} className="movie-img" alt="..." />)}
                            <div className="card-body">
                                {data && data.poster && (<h3 className="card-title">{data.movieName}</h3>)}
                                {data && data.plot && (<p className="card-text">{data.plot}</p>)}
                                {data && data.yearOfRelease && (<p className="card-text"><b>Year:</b> {data.yearOfRelease}</p>)}
                                {data && data.producer && (<p className="card-text"><b>Producer:</b> {data.producer.producerName}</p>)}
                                {data && (<p className='card-text'><b>Stars: </b>
                                    {data.actors.map((actor) => (
                                        <span className="card-text" key={actor.actorName}>{actor.actorName} ,</span>
                                    ))}
                                </p>)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

}

export default Movie