import React, { useEffect, useState } from 'react'
import '../css/Home.css'
import { Link } from 'react-router-dom'

function Home() {
  const [IMDBAPI, setIMDBAPI] = useState([])
  const [query, setQuery] = useState('vijay')
  const API_KEY = process.env.REACT_APP_API_KEY
  const url = `https://imdb146.p.rapidapi.com/v1/find/?query=${query}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
    }
  };

  // fetchData function to get IMDB API Data
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

  useEffect(() => { fetchData() }, [])

  return (
    <div className='container m-5 p-5'>
      <div className='search-imdb'>
        <input
          type="text"
          className="form-control"
          id="search"
          placeholder="Enter query to search"
          title="Enter Your Query to get results from IMDB API"
          value={query}
          onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-warning" onClick={() => { fetchData(); setQuery(''); }}>Search</button>
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
                <h2>{item.displayNameText}</h2>
                {item.avatarImageModel && (
                  <img
                    className='imdb-img'
                    src={item.avatarImageModel ? item.avatarImageModel.url : 'https://via.placeholder.com/300'}
                    alt='Poster not available'
                  />
                )}
                <h4>{item.knownForJobCategory}</h4>
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
      <h3 className='container text-warning p-4 m-4'>News Feed</h3>
      <div className='new-container'><img src='https://images.indianexpress.com/2024/01/goat-01012024.jpg'height={150} alt='Goat Poster'/>
      <p className='p-2 m-2'>Venkat Prabhu's directorial 'GOAT' new schedule begins today in Sri Lanka while vijay will be joining the team soon.
      The Greatest of All Time is slated to release in late 2024. Notably, GOAT went on floors under the working title Thalapathy 68 in October 2023.
      <Link to={'http://timesofindia.indiatimes.com/articleshow/106513922.cms?from=mdr&utm_source=contentofinterest&utm_medium=text&utm_campaign=cppst'} target='_blank' rel='noreferrer'> Read more...</Link>
      </p>
      </div><br/>
      <div className='new-container'><img src='https://tamil.cdn.zeenews.com/tamil/sites/default/files/2023/07/12/304062-vidamuyarchi.jpg' height={150} alt='Vidamuyarchi Poster'/>
      <p className='p-2 m-2'>The company made a public announcement on 18 March 2022, confirming the project; the film was announced under the working title AK62. In late January 2023 however, 
      Vignesh, who was reportedly given almost six months to complete the pre-production, had failed to impress Ajith with the final script work.
      <Link to={'https://en.wikipedia.org/wiki/Vidaa_Muyarchi'} target='_blank' rel='noreferrer'> Read more...</Link>
      </p></div><br/>
      <div className='new-container'><img src='https://i.ytimg.com/vi/oBlxdr1KbEA/maxresdefault.jpg' height={150} alt='kanguva Poster'/>
      <p className='p-2 m-2'>Kanguva, also known and marketed as Kanguva: A Mighty Valiant Saga, is an upcoming Indian Tamil-language fantasy action film directed by Siva and produced by K. E. Gnanavel Raja,
       V. Vamsi Krishna Reddy and Pramod Uppalapati under the banners of Studio Green and UV Creations.
      <Link to={'https://en.wikipedia.org/wiki/Kanguva'} target='_blank' rel='noreferrer'> Read more...</Link>
      </p></div><br/>
    </div>
  )
}

export default Home