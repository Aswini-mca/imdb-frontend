import React, { useEffect, useState } from 'react'
import '../css/Home.css'

function Home() {
  const [IMDBAPI, setIMDBAPI] = useState([])
  const [query, setQuery] = useState('vijay')

  const url = `https://imdb146.p.rapidapi.com/v1/find/?query=${query}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '04dbdb7f72msh24b22eb5d29438ap18e2a1jsn3b947aefdcd2',
      'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
    }
  };

  async function fetchData() {
    await fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const list = data.nameResults.results;
        setIMDBAPI(list);
      })
      .catch((error) =>
        console.error(error)

      )
  }
  
  useEffect(() => {fetchData()}, [])
  return (
    <div className='container m-5 p-5'>
      <div className='d-flex justify-content-between w-25'>
        <input 
        type="text" 
        className="form-control"
        id="search"
        placeholder="Enter query to search"
        title="Enter Your Query to get results from IMDB API"
        value={query} 
        onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-warning" onClick={fetchData}>Search</button>
      </div>
      <div className='text-center text-light mt-4'>
      <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {IMDBAPI.map((item, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
              >
                <h2>{item.knownForTitleText}</h2>
                {item.avatarImageModel && (
                  <img
                    className='imdb-img'
                    src={item.avatarImageModel.url}
                    alt={item.knownForTitleText}
                  />
                )}
                <p>{item.knownForTitleYear}</p>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home